from datetime import date as Idate
from decimal import Decimal
from typing import List, Optional

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from ninja import NinjaAPI, Schema

from vizu.apps.core.models import Expense

api = NinjaAPI()


@api.get("/_healthcheck/")
def healthcheck(request):
    return JsonResponse({"status": "ok"})


class ExpenseGet(Schema):
    date: Idate
    value: Decimal
    description: str
    category: str


@api.get("/expenses/", response=List[ExpenseGet])
def list_expenses(request):
    return Expense.objects.all()


@api.get("/expenses/{id}/", response=ExpenseGet)
def get_expense(request, id: int):
    return get_object_or_404(Expense, id=id)


class ExpenseCreate(Schema):
    date: Idate
    value: Decimal
    description: Optional[str] = None
    category: Optional[str] = None


@api.post("/expenses/")
def create_expense(request, payload: ExpenseCreate):
    expense = Expense.objects.create(**payload.dict())
    return JsonResponse(
        {"data": expense.to_dict(), "message": "Expense created successfully."},
        status=201,
    )


class ExpenseUpdate(Schema):
    date: Optional[Idate] = None
    value: Optional[Decimal] = None
    description: Optional[str] = None
    category: Optional[str] = None


@api.put("/expenses/{id}/")
def update_expense(request, id: int, payload: ExpenseUpdate):
    expense = get_object_or_404(Expense, id=id)

    for attr, value in payload.dict(exclude_unset=True).items():
        setattr(expense, attr, value)

    expense.save()

    return JsonResponse(
        {"data": expense.to_dict(), "message": "Expense updated successfully."}
    )


@api.delete("/expenses/{id}/")
def delete_expense(request, id: int):
    expense = get_object_or_404(Expense, id=id)
    expense.delete()
    return {"message": "Expense deleted successfully."}
