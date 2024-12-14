from django.urls import path

from . import views

urlpatterns = [
    path("_healthcheck/", views.healthcheck, name="healthcheck"),
]
