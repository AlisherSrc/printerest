from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from api.models import Pin, User, Album
from api.serializers import PinSerializer, AlbumSerializer
from rest_framework.decorators import api_view

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, status
from rest_framework.response import Response


@api_view(['GET', 'PUT', 'DELETE', 'POST'])
def album(request, id):
    try:
        album_obj = Album.objects.get(id=id)
    except Album.DoesNotExist as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        album = AlbumSerializer(album_obj)
        print(album)
        return Response(album.data)
    elif request.method == 'POST':
        album_data = request.data
        pins_data = album_data.pop('pins', [])

        # Create a list of dict objects, each representing a Pin instance
        pins = []
        for pin_data in pins_data:
            try:
                pin = Pin.objects.get(id=pin_data['id'])
                pins.append(pin)
            except Pin.DoesNotExist:
                # If the Pin instance doesn't exist, create it
                pin_serializer = PinSerializer(data=pin_data)
                if pin_serializer.is_valid():
                    pin = pin_serializer.save()
                    pins.append(pin)
                else:
                    return Response(pin_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Create the Album instance with the Pins
        album_data['user'] = request.user.id  # assuming you're using DRF's token authentication
        album_serializer = AlbumSerializer(data=album_data)
        if album_serializer.is_valid():
            album = album_serializer.save()
            album.pins.set(pins)  # Add the Pins to the Album
            return Response(album_serializer.data, status=status.HTTP_201_CREATED)
        return Response(album_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        album = AlbumSerializer(album_obj, data=request.data, context={"request": request})
        if album.is_valid():
            album.save()
            return Response(album.data)
        return Response(album.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        album_obj.delete()
        return Response({'deleted': True})
class Albums(generics.ListCreateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
@api_view(['GET'])
def get_albums_by_user(request,username):
    user_obj = User.objects.get(username=username)
    albums_obj = Album.objects.filter(user=user_obj)
    albums = AlbumSerializer(albums_obj,many=True)

    return Response(albums.data)

@api_view(['GET'])
def get_album_by_name(request,username,albumname):
    user_obj = User.objects.get(username=username)
    album_obj = Album.objects.get(name=albumname,user=user_obj.id)

    album = AlbumSerializer(album_obj)

    return Response(album.data)