from django.contrib import admin

from api.models import Pin, User, Tag, Category, Album

# Register your models here.
admin.site.register(Pin)
admin.site.register(User)
admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(Album)