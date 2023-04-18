from rest_framework import serializers
from django.db import models
from api.models import User,Tag,USER_STATUS_CHOICES

class UserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ('username','password','email',)

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