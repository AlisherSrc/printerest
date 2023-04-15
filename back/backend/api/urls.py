from django.urls import path
from . import views

urlpatterns = [
    path('pins/',views.pins),
    path('pins/<int:id>/',views.pin)
]