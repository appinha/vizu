import pytest
from vizu.apps.core.models import Expense

pytestmark = pytest.mark.django_db


def test_healthcheck(client):
    response = client.get("/api/_healthcheck/")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


@pytest.fixture
def expense_data_dec():
    return {
        "date": "2024-12-10",
        "value": 81.52,
        "description": "Mia Pizzaria",
        "category": "Restaurante",
    }


@pytest.fixture
def expense_data_oct():
    return {
        "date": "2024-12-07",
        "value": 288,
        "description": "Risoteria Villa Lobos",
        "category": "Restaurante",
    }


@pytest.fixture
def expense_data_feb():
    return {
        "date": "2025-02-13",
        "value": 33,
        "description": "Renner",
        "category": "Vestuário",
    }


@pytest.fixture
def create_expense(expense_data_dec):
    expense = Expense.objects.create(**expense_data_dec)
    return expense.to_dict()


@pytest.fixture
def create_expenses(expense_data_dec, expense_data_oct, expense_data_feb):
    expense_1 = Expense.objects.create(**expense_data_dec)
    expense_2 = Expense.objects.create(**expense_data_oct)
    expense_3 = Expense.objects.create(**expense_data_feb)
    return [expense_1.to_dict(), expense_2.to_dict(), expense_3.to_dict()]


class TestExpenses:
    def test_list_all_expenses(self, client, create_expenses):
        response = client.get("/api/expenses/")

        assert response.status_code == 200

        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 3

        expense_1 = data[0]
        assert expense_1["date"] == create_expenses[0]["date"]
        assert expense_1["value"] == f"{create_expenses[0]["value"]:.2f}"
        assert expense_1["description"] == create_expenses[0]["description"]
        assert expense_1["category"] == create_expenses[0]["category"]

        expense_2 = data[1]
        assert expense_2["date"] == create_expenses[1]["date"]
        assert expense_2["value"] == f"{create_expenses[1]["value"]:.2f}"
        assert expense_2["description"] == create_expenses[1]["description"]
        assert expense_2["category"] == create_expenses[1]["category"]

    def test_list_month_expenses(self, client, create_expenses, expense_data_feb):
        response = client.get("/api/expenses/?period=202502")

        assert response.status_code == 200

        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 1

        expense = data[0]
        assert expense["date"] == expense_data_feb["date"]
        assert expense["value"] == f"{expense_data_feb["value"]:.2f}"
        assert expense["description"] == expense_data_feb["description"]
        assert expense["category"] == expense_data_feb["category"]

    def test_list_month_expenses_empty(self, client, expense_data_feb):
        response = client.get("/api/expenses/?period=202509")

        assert response.status_code == 200

        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 0

    def test_list_month_expenses_unsupported_period(self, client):
        response = client.get("/api/expenses/?period=2025")

        assert response.status_code == 400
        assert response.json() == {"error": "Invalid period format."}

    def test_list_month_expenses_invalid_period_value(self, client):
        response = client.get("/api/expenses/?period=tester")

        assert response.status_code == 422

        data = response.json()
        assert (
            data["detail"][0]["msg"]
            == "Input should be a valid integer, unable to parse string as an integer"
        )

    def test_get_expense(self, client, create_expense):
        response = client.get(
            f"/api/expenses/{create_expense["id"]}/",
        )

        assert response.status_code == 200

        data = response.json()
        assert data["date"] == create_expense["date"]
        assert data["value"] == f"{create_expense["value"]:.2f}"
        assert data["description"] == create_expense["description"]
        assert data["category"] == create_expense["category"]

    def test_create_expense(self, client, expense_data_dec):
        response = client.post(
            "/api/expenses/", expense_data_dec, content_type="application/json"
        )

        assert response.status_code == 201

        response = response.json()
        assert response["message"] == "Expense created successfully."

        expense = response["data"]
        assert expense["date"] == expense_data_dec["date"]
        assert expense["value"] == f"{expense_data_dec["value"]:.2f}"
        assert expense["description"] == expense_data_dec["description"]
        assert expense["category"] == expense_data_dec["category"]

        created_expense = Expense.objects.get(id=expense["id"])
        assert created_expense.date.isoformat() == expense_data_dec["date"]
        assert f"{created_expense.value:.2f}" == f"{expense_data_dec["value"]:.2f}"
        assert created_expense.description == expense_data_dec["description"]
        assert created_expense.category == expense_data_dec["category"]

    def test_update_expense(self, client, create_expense):
        payload = {"value": 100}

        response = client.put(
            f"/api/expenses/{create_expense["id"]}/",
            payload,
            content_type="application/json",
        )

        assert response.status_code == 200

        response = response.json()
        assert response["message"] == "Expense updated successfully."

        expense = response["data"]
        assert expense["value"] == "100"  # updated
        assert expense["date"] == create_expense["date"]
        assert expense["description"] == create_expense["description"]
        assert expense["category"] == create_expense["category"]

        updated_expense = Expense.objects.get(id=create_expense["id"])
        assert f"{updated_expense.value:.2f}" == "100.00"
        assert updated_expense.date.isoformat() == create_expense["date"]
        assert updated_expense.description == create_expense["description"]
        assert updated_expense.category == create_expense["category"]

    def test_delete_expense(self, client, create_expense):
        response = client.delete(
            f"/api/expenses/{create_expense["id"]}/",
        )

        assert response.status_code == 200

        response = response.json()
        assert response["message"] == "Expense deleted successfully."

        assert len(list(Expense.objects.all())) == 0
