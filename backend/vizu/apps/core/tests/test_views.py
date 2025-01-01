from decimal import Decimal


def test_healthcheck(client):
    response = client.get("/api/_healthcheck/")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


class TestExpenses:
    def test_get_expenses(self, client):
        response = client.get("/api/expenses/")

        assert response.status_code == 200

        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 2

        expense_1 = data[0]
        assert expense_1["date"] == "2024-12-10"
        assert expense_1["value"] == "81.5"
        assert expense_1["description"] == "Mia Pizzaria"
        assert expense_1["category"] == "Restaurante"

        expense_2 = data[1]
        assert expense_2["date"] == "2024-12-07"
        assert expense_2["value"] == "288"
        assert expense_2["description"] == "Risoteria Villa Lobos"
        assert expense_2["category"] == "Restaurante"
