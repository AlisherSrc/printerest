from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from api.models import Pin, User
from api.serializers import PinSerializer
from rest_framework.decorators import api_view

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, status
from rest_framework.response import Response


# Create your views here.
@api_view(['GET','PUT','DELETE','POST'])
def pin(request,id):
    # First we try to get this element to do further manipulations with it
    try:
        pin_obj = Pin.objects.get(id=id)
    except Pin.DoesNotExist as e:
        return Response({'error':str(e)},status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        pin = PinSerializer(pin_obj)
        return Response(pin.data)
    elif request.method == 'POST':
        pin = PinSerializer(data=request.data)
        if pin.is_valid():
            pin.save()
            return Response(pin.data,status=status.HTTP_201_CREATED)
        return Response(pin.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        # Using object above and changing it
        pin = PinSerializer(pin_obj, data=request.data, context={"request":request})
        # Checks if
        if pin.is_valid():
            pin.save()
            return Response(pin.data)
        return Response(pin.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        pin_obj.delete()
        return Response({'deleted':True})



class Pins(generics.ListCreateAPIView):
    queryset = Pin.objects.all()
    serializer_class = PinSerializer
    # will work only if authorized
    # permission_classes = (IsAuthenticated,)
    # will work without auth
    # permission_classes = (AllowAny,)
# allows to use REST Django
@api_view(['GET'])
def get_pins_by_user(request,username):
    user_obj = User.objects.get(username=username)
    pins_obj = Pin.objects.filter(user=user_obj)
    pins = PinSerializer(pins_obj,many=True)
    return Response(pins.data)


