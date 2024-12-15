from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    """
    CustomUserManager for the CustomUser.
    Two main differences from the default manager:
    1. it doesn't have `username`;
    2. since it doesn't have an `username`, the unique identifier is the `email`;
    3. the first_name is required.

    This manager ensures that the `User` is created *without* an `username`
    and always *with* an `email` and a `first_name`.
    """

    def create_user(self, email, password, first_name, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError(_("The email must be set"))
        if not first_name:
            raise ValueError(_("The first name must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, first_name, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, first_name, **extra_fields)
