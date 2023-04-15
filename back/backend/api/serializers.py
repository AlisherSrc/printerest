from rest_framework import serializers
from django.db import models
from models import User,Tag,USER_STATUS_CHOICES

# class CompanySer(serializers.Serializer):
#     id = serializers.IntegerField()
#     name = serializers.CharField(max_length=255)
#     description = serializers.CharField(default="")
#     city = serializers.CharField(max_length=255)
#     address = serializers.CharField(default="")
# class CompanyModSer(serializers.ModelSerializer):
#     class Meta:
#         model = Company
#         fields = ('id','name','description','city','address')
# class User(models.Model):
#     username = models.CharField(max_length=255)
#     phone = models.CharField(max_length=255,blank=True,null=True)
#     email = models.EmailField()
#     status = models.CharField(max_length=10,choices=USER_STATUS_CHOICES, default="active")

class UserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    phone = serializers.CharField(max_length=255,blank=True,null=True)
    email = serializers.EmailField()
    status = serializers.CharField(max_length=10,choices=USER_STATUS_CHOICES, default="active")

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name')



class PinSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    description = serializers.CharField(blank=True, null=True)
    contentUrl = serializers.URLField()
    timeUploaded = serializers.DateTimeField()
    user = UserSerializer()
    tags = TagSerializer(many=True)
    destinationLink = serializers.URLField()

    # if serializer
    def create(self, validated_data):
        pass
    def update(self, instance, validated_data):
        pass