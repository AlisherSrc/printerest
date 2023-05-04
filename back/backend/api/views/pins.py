import json
import os

from django.core.files.storage import FileSystemStorage
from django.utils import timezone
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from api.models import Pin, User
from api.serializers import PinSerializer
from rest_framework.decorators import api_view

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, status
from rest_framework.response import Response


from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

from requests_toolbelt.multipart import decoder

from api.models import Tag


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


#
# class Pins(generics.ListCreateAPIView):
#     queryset = Pin.objects.all()
#     serializer_class = PinSerializer
#
#     # will work only if authorized
#     # permission_classes = (IsAuthenticated,)
#     # will work without auth
#     # permission_classes = (AllowAny,)
#
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#
#         # Save the image file
#         image_file = request.FILES.get('content')
#         if image_file:
#             fs = FileSystemStorage(location='media/pins')
#             filename = fs.save(image_file.name, image_file)
#
#             # Get the URL of the saved image
#             saved_image_url = fs.url(filename)
#
#             # Update the serializer data with the saved image URL
#             serializer.validated_data['contentUrl'] = saved_image_url
#
#         # Save the pin
#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
class Pins(generics.ListCreateAPIView):
    queryset = Pin.objects.all()
    serializer_class = PinSerializer
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):




        title = request.data.get('title')
        description = request.data.get('description')
        content = request.FILES.get('content')
        destination_link = request.data.get('destinationLink')
        timeUploaded = request.data.get('timeUploaded')
        tags = request.data.get('tags')
        username = request.data.get('username')

        # Access the uploaded file
        content_url = content.name if content else None



        tags_data = tags.read().decode('utf-8')

        tags = json.loads(tags_data)

        print(username[1:-1])

        # Save the uploaded image file to a specific location within the static files directory
        # content_path = os.path.join('pins', content.name)
        # content_full_path = os.path.join(settings.STATIC_ROOT, content_path)
        # with open(content_full_path, 'wb') as f:
        #     for chunk in content.chunks():
        #         f.write(chunk)

        # Create a new Pin object
        pin = Pin(
            title=title,
            description=description,
            contentUrl=content_url,
            content=content,
            timeUploaded=timeUploaded,
            user=User.objects.get(username=username[1:-1]),
            destinationLink=destination_link
        )

        pin.save()

        # Add tags to the pin
        for tag in tags:
            tag_obj, _ = Tag.objects.get_or_create(name=tag)
            pin.tags.add(tag_obj)

        return Response({'message': 'Image uploaded successfully'}, status=status.HTTP_201_CREATED)
# allows to use REST Django
@api_view(['GET'])
def get_pins_by_user(request,username):
    user_obj = User.objects.get(username=username)
    pins_obj = Pin.objects.filter(user=user_obj)
    pins = PinSerializer(pins_obj,many=True)
    return Response(pins.data)


