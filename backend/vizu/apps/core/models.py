from django.db import models


class Expense(models.Model):
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    date = models.DateField()
    value = models.DecimalField(decimal_places=2, max_digits=13)
    description = models.CharField(max_length=150, blank=True, null=True)
    category = models.CharField(max_length=32, blank=True, null=True)

    def to_dict(self):
        return {
            "id": self.id,
            "date": self.date,
            "value": self.value,
            "description": self.description,
            "category": self.category,
        }
