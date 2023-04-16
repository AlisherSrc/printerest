from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from api.models import Pin
from api.serializers import PinSerializer

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics

# Create your views here.
def pin(request,id):
    pin_obj = Pin.objects.get(id=id)
    pin = PinSerializer(pin_obj)
    return JsonResponse(pin.data)

class Pins(generics.ListCreateAPIView):
    queryset = Pin.objects.all()
    serializer_class = PinSerializer
    # will work only if authorized
    # permission_classes = (IsAuthenticated,)
    # will work without auth
    # permission_classes = (AllowAny,)