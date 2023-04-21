from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from api.models import Pin, UserProfile
from api.serializers import PinSerializer
from rest_framework.decorators import api_view

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, status
from rest_framework.response import Response

User = get_user_model()

class UserProfileView(APIView):
    def get_object(self, pk):
        try:
            profile = UserProfile.objects.get(pk=pk)
        except UserProfile.DoesNotExist:
            raise Http404
        return profile

    def get(self, request, pk):
        profile = self.get_object(pk)
        if profile.user != request.user:
            return Response({'error': 'You are not authorized to access this profile'}, status=status.HTTP_401_UNAUTHORIZED)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)