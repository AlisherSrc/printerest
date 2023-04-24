from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from api.models import Pin
from api.serializers import PinSerializer
from django.views.static import serve
from rest_framework.decorators import api_view

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics, status
from rest_framework.response import Response

from backend import settings


def serve_avatar(request,path):
    file_path = f"{settings.MEDIA_ROOT}/{path}"
    print(file_path)
    return serve(request,path,document_root=settings.MEDIA_ROOT)