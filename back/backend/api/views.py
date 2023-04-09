from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from api.models import Pin

# Create your views here.
def pin(request,id):
    pin_obj =  Pin.objects.get(id=id)
    return
def pins(request):
    pass