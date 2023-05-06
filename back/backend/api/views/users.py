from django.contrib.auth import get_user_model
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, Http404
from api.models import Pin, UserProfile
from api.serializers import PinSerializer, UserProfileSerializer
from rest_framework.decorators import api_view

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth.models import User
from ..serializers import UserSerializer
from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
User = get_user_model()


from rest_framework.permissions import IsAuthenticated, AllowAny

class RegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            response_data = serializer.data
            response_data['token'] = token
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# to here



class UserProfileView(APIView):
    permission_classes = [AllowAny]
    # @staticmethod
    # def get_object(pk):
    #     try:
    #         profile = UserProfile.objects.get(pk=pk)
    #     except UserProfile.DoesNotExist:
    #         raise Http404
    #     return profile
    @staticmethod
    def get_object(username):
        try:
            user = User.objects.get(username=username)
            profile = UserProfile.objects.get(user=user)
        except User.DoesNotExist:
            raise Http404
        except UserProfile.DoesNotExist:
            raise Http404
        return profile

    def get(self, request, username):
        profile = self.get_object(username)

        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def post(self, request):
        print("Req: " + str(request.data))
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, username):
        profile = self.get_object(username)
        serializer = UserProfileSerializer(profile, data=request.data)

        if serializer.is_valid():

            serializer.save()
            # print("Request data:", request.data)  #  everything is fine here
            # print("Serializer data:", serializer.data)
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, username):
        profile = self.get_object(username)
        profile.delete()
        return Response({'deleted': True})


