import pytest
from vizu.apps.core.models import Expense

pytestmark = pytest.mark.django_db


def test_healthcheck(client):
    response = client.get("/api/_healthcheck/")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


@pytest.fixture
def expense_data():
    return {
        "date": "2024-12-10",
        "value": 81.52,
        "description": "Mia Pizzaria",
        "category": "Restaurante",
    }


@pytest.fixture
def expense_data_2():
    return {
        "date": "2024-12-07",
        "value": 288,
        "description": "Risoteria Villa Lobos",
        "category": "Restaurante",
    }


@pytest.fixture
def create_expense(expense_data):
    expense = Expense.objects.create(**expense_data)
    return expense.to_dict()


@pytest.fixture
def create_expenses(expense_data, expense_data_2):
    expense_1 = Expense.objects.create(**expense_data)
    expense_2 = Expense.objects.create(**expense_data_2)
    return [expense_1.to_dict(), expense_2.to_dict()]


class TestExpenses:
    def test_list_expenses(self, client, create_expenses):
        response = client.get("/api/expenses/")

        assert response.status_code == 200

        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 2

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

    def test_create_expense(self, client, expense_data):
        response = client.post(
            "/api/expenses/", expense_data, content_type="application/json"
        )

        assert response.status_code == 201

        response = response.json()
        assert response["message"] == "Expense created successfully."

        expense = response["data"]
        assert expense["date"] == expense_data["date"]
        assert expense["value"] == f"{expense_data["value"]:.2f}"
        assert expense["description"] == expense_data["description"]
        assert expense["category"] == expense_data["category"]

        created_expense = Expense.objects.get(id=expense["id"])
        assert created_expense.date.isoformat() == expense_data["date"]
        assert f"{created_expense.value:.2f}" == f"{expense_data["value"]:.2f}"
        assert created_expense.description == expense_data["description"]
        assert created_expense.category == expense_data["category"]

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
