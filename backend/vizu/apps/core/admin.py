from django.contrib import admin

from .models import Expense


class ExpenseAdmin(admin.ModelAdmin):
    model = Expense
    list_display = (
        "id",
        "date",
        "value",
        "description",
        "category",
        "created_at",
        "updated_at",
    )


admin.site.register(Expense, ExpenseAdmin)
