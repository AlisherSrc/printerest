from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

from . import views

urlpatterns = [
    path('login/', obtain_jwt_token),
    path('pins/',views.Pins.as_view()),
    path('pins/<str:username>/',views.pin),
    path('users/<str:username>/',views.UserProfileView.as_view()),
]