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

User = get_user_model()


class UserProfileView(APIView):
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
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, username):
        profile = self.get_object(username)
        serializer = UserProfileSerializer(profile, data=request.data)

        if serializer.is_valid():

            serializer.save()
            # print("Request data:", request.data)  # Add this line everything is fine here
            # print("Serializer data:", serializer.data)  # Add this line
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, username):
        profile = self.get_object(username)
        profile.delete()
        return Response({'deleted': True})


