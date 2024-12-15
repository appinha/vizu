from django.http import JsonResponse
from ninja import NinjaAPI


api = NinjaAPI()


@api.get("/_healthcheck/")
def healthcheck(request):
    return JsonResponse({"status": "ok"})
