from django.contrib import admin

from api.models import Pin, UserProfile, Tag, Category, Album, Notification, Message


# Register your models here.
admin.site.register(Pin)
admin.site.register(UserProfile)
admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(Album)
admin.site.register(Notification)
admin.site.register(Message)
