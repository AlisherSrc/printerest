from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from api.models import Pin
from api.serializers import PinSerializer


# Create your views here.
def pin(request,id):
    pin_obj = Pin.objects.get(id=id)
    pin = PinSerializer(pin_obj)
    return JsonResponse(pin.data)
def pins(request):
    pins_obj = Pin.objects.all()
    pins = PinSerializer(pins_obj,many=True)

    return JsonResponse(pins.data,safe=False)