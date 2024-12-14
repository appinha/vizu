import pytest
from django.db import IntegrityError
from django.test import override_settings
from django.urls import reverse

pytestmark = pytest.mark.django_db


class TestUserCreation:
    """
    Tests to ensure that user creation works as intended,
    including having email and first_name as required attributes.
    """

    def test_create_user(self, django_user_model):
        user = django_user_model.objects.create_user(
            email="normal@user.com", first_name="normal", password="foo"
        )
        assert user.email == "normal@user.com"
        assert user.first_name == "normal"
        assert user.is_active is True
        assert user.is_staff is False
        assert user.is_superuser is False

        with pytest.raises(AttributeError):
            user.username
        with pytest.raises(TypeError):
            django_user_model.objects.create_user()

        # if there's no email, it's a TypeError
        with pytest.raises(TypeError):
            django_user_model.objects.create_user(first_name="Testing", password="foo")

        # if there's no first_name, it's a TypeError
        with pytest.raises(TypeError):
            django_user_model.objects.create_user(
                email="testing.test.com", password="foo"
            )

        # if there's an email, but it's empty, it's a ValueError
        with pytest.raises(ValueError, match="The email must be set"):
            django_user_model.objects.create_user(
                email="", first_name="Testing", password="foo"
            )

        # if there's a first_name, but it's empty, it's a ValueError
        with pytest.raises(ValueError, match="The first name must be set"):
            django_user_model.objects.create_user(
                email="test@test.com", first_name="", password="foo"
            )

    def test_create_superuser(self, django_user_model):
        admin_user = django_user_model.objects.create_superuser(
            email="super@user.com", first_name="super", password="foo"
        )
        assert admin_user.email == "super@user.com"
        assert admin_user.first_name == "super"
        assert admin_user.is_active is True
        assert admin_user.is_staff is True
        assert admin_user.is_superuser is True

        with pytest.raises(AttributeError):
            admin_user.username

        # if there's no email, it's a TypeError
        with pytest.raises(TypeError):
            django_user_model.objects.create_superuser(
                first_name="Super", password="foo"
            )

        # if there's no first_name, it's a TypeError
        with pytest.raises(TypeError):
            django_user_model.objects.create_superuser(
                email="super@user.com", password="foo"
            )

        # if there's an email, but it's empty, it's a ValueError
        with pytest.raises(ValueError, match="The email must be set"):
            django_user_model.objects.create_superuser(
                email="", first_name="Super", password="foo"
            )

        # if there's a first_name, but it's empty, it's a ValueError
        with pytest.raises(ValueError, match="The first name must be set"):
            django_user_model.objects.create_superuser(
                email="super@user.com", first_name="", password="foo"
            )

        # a superuser can't have is_superuser=False
        with pytest.raises(ValueError):
            django_user_model.objects.create_superuser(
                email="super@user.com",
                first_name="Super",
                password="foo",
                is_superuser=False,
            )

        # a superuser can't have is_staff=False
        with pytest.raises(ValueError):
            django_user_model.objects.create_superuser(
                email="super@user.com",
                first_name="Super",
                password="foo",
                is_staff=False,
            )


class TestEmailCIProperties:
    """
    Tests to ensure that filtering, searching and creating users by email is always case-insensitive.
    """

    def test_email_case_insensitive_search(self, django_user_model):
        user = django_user_model.objects.create_user(
            email="test@example.com", first_name="test", password="password123"
        )
        assert django_user_model.objects.filter(
            email__iexact="TEST@EXAMPLE.COM"
        ).exists()
        user2 = django_user_model.objects.get(email="TeST@ExamPLE.coM")
        assert user == user2

    def test_email_case_insensitive_unique_creation(self, django_user_model):
        django_user_model.objects.create_user(
            email="Hacker@example.com", first_name="hacker", password="password123"
        )
        msg = "UNIQUE constraint failed: accounts_customuser.email"
        with pytest.raises(IntegrityError, match=msg):
            django_user_model.objects.create_user(
                email="hacker@example.com", first_name="hacker", password="password123"
            )


class TestCustomUserMethods:
    @pytest.fixture
    def custom_user(self, django_user_model):
        return django_user_model.objects.create_user(
            email="caue@treinor.com.br",
            password="treinor",
            first_name="Caue",
            last_name="Bittencourt",
        )

    def test_clean(self, custom_user):
        custom_user.email = "caue@TREINOR.COM.BR"
        custom_user.clean()
        assert custom_user.email == "caue@treinor.com.br"

    def test_get_full_name(self, custom_user):
        assert custom_user.get_full_name() == "Caue Bittencourt"

    def test_get_short_name(self, custom_user):
        assert custom_user.get_short_name() == "Caue"

    def test_email_user(self, custom_user):
        from django.core import mail

        custom_user.email_user("Email Subject", "Email message", "from@email.com")
        assert len(mail.outbox) == 1
        email = mail.outbox[0]
        assert email.subject == "Email Subject"
        assert email.body == "Email message"
        assert email.from_email == "from@email.com"


class TestCustomUserAdmin:
    """
    Tests to ensure the the filtering and searching of users by email in the admin works as expected.
    """

    @pytest.fixture
    def custom_superuser(self, django_user_model):
        return django_user_model.objects.create_superuser(
            email="caue@treinor.com.br",
            password="treinor",
            first_name="Caue",
            last_name="Bittencourt",
        )

    @override_settings(TREINOR_ENVIRONMENT="test")
    def test_get_queryset(self, client, django_user_model, custom_superuser):
        url = reverse("admin:accounts_customuser_changelist")

        # cria usuários com emails em ordem alfabética
        django_user_model.objects.create_user(
            email="ze@email.com", first_name="ze", password="a"
        )
        django_user_model.objects.create_user(
            email="ana@email.com", first_name="ana", password="b"
        )
        django_user_model.objects.create_user(
            email="bruno@email.com", first_name="bruno", password="c"
        )

        client.force_login(custom_superuser)
        res = client.get(url)
        assert res.status_code == 200

        queryset = res.context["cl"].queryset

        # garante que encontrou o número certo de usuários e que eles vieram na ordem certa
        assert queryset.count() == 4
        assert queryset[0].email == "ana@email.com"
        assert queryset[1].email == "bruno@email.com"
        assert queryset[2].email == "caue@treinor.com.br"
        assert queryset[3].email == "ze@email.com"
