from django.http import JsonResponse
from ninja import NinjaAPI, Schema
from decimal import Decimal
from typing import List

api = NinjaAPI()


@api.get("/_healthcheck/")
def healthcheck(request):
    return JsonResponse({"status": "ok"})


class ExpenseOut(Schema):
    date: str
    value: Decimal
    description: str
    category: str


@api.get("/expenses/", response=List[ExpenseOut])
def list_expenses(request):
    return [
        {
            "date": "2024-12-10",
            "value": 81.5,
            "description": "Mia Pizzaria",
            "category": "Restaurante",
        },
        {
            "date": "2024-12-07",
            "value": 288,
            "description": "Risoteria Villa Lobos",
            "category": "Restaurante",
        },
    ]
