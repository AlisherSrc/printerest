from rest_framework import serializers
from django.db import models
from api.models import User,Tag,USER_STATUS_CHOICES

class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    phone = serializers.CharField()
    email = serializers.EmailField()
    status = serializers.CharField()

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name',)



class PinSerializer(serializers.Serializer):
    title = serializers.CharField()
    description = serializers.CharField()
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