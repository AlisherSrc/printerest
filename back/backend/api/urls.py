from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
import re
from . import views

urlpatterns = [
    path('login/', obtain_jwt_token),
    path('pins/',views.Pins.as_view()),
    path('pins/<int:id>/',views.pin),
    path('users/<str:username>/',views.UserProfileView.as_view()),
    path('media/<path:path>',views.serve_avatar)
]