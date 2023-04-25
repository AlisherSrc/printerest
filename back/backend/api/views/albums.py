from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from api.models import Pin, User, Album
from api.serializers import PinSerializer, AlbumSerializer
from rest_framework.decorators import api_view

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, status
from rest_framework.response import Response

@api_view(['GET','PUT','DELETE','POST'])
def album(request, id):
    try:
        album_obj = Album.objects.get(id=id)
    except Album.DoesNotExist as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        album = AlbumSerializer(album_obj)
        return Response(album.data)
    elif request.method == 'POST':
        album = AlbumSerializer(data=request.data)
        if album.is_valid():
            album.save()
            return Response(album.data, status=status.HTTP_201_CREATED)
        return Response(album.errors, status=status.HTTP_400_BAD_REQUEST)
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