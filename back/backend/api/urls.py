from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
import re
from . import views

urlpatterns = [
    path('login/', obtain_jwt_token),
    path('pins/',views.Pins.as_view()),
    path('pins/<int:id>/',views.pin),
    path('pins/<str:username>',views.get_pins_by_user),
    path('users/<str:username>/',views.UserProfileView.as_view()),
    path('media/<path:path>',views.serve_avatar),
    path('albums/',views.Albums.as_view()),
    path('albums/<int:id>',views.album),
    path('albums/<str:username>',views.get_albums_by_user),
    path('albums/<str:username>/<str:albumname>',views.get_album_by_name)
]