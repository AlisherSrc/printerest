from rest_framework import serializers
from django.db import models
from api.models import User,Tag,USER_STATUS_CHOICES

from api.models import Pin, UserProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','password','email',)

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id','name',)

        extra_kwargs = {
            'id': {'required': False}
        }


class PinSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=False,required=False)
    title = serializers.CharField()
    description = serializers.CharField()
    contentUrl = serializers.URLField()
    timeUploaded = serializers.DateTimeField()
    # It will not show up in response
    # user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    user = UserSerializer(read_only=True)
    tags = TagSerializer(many=True)
    destinationLink = serializers.URLField()

    def create(self, validated_data):
        # Getting user
        user = self.context['request'].user
        # because we can't assign values to the ManyToMany field directly, so we will do it manually
        # using set() or similar method
        tags_data = validated_data.pop('tags')

        pin = Pin.objects.create(**validated_data)
        pin.user = user
        for tag_data in tags_data:
            tag, _ = Tag.objects.get_or_create(name=tag_data['name'])
            pin.tags.add(tag)

        return pin

    def update(self, instance, validated_data):
        # instance.title = validated_data.get('title', instance.title)
        # instance.description = validated_data.get('description', instance.description)
        # instance.contentUrl = validated_data.get('contentUrl', instance.contentUrl)
        # instance.timeUploaded = validated_data.get('timeUploaded', instance.timeUploaded)
        # instance.tags.set(validated_data.get('tags', instance.tags.all()))
        # instance.destinationLink = validated_data.get('destinationLink', instance.destinationLink)
        # instance.save()
        # return instance

        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.contentUrl = validated_data.get('contentUrl', instance.contentUrl)
        instance.timeUploaded = validated_data.get('timeUploaded', instance.timeUploaded)
        tags_data = validated_data.get('tags')
        if tags_data:
            instance.tags.clear()
            for tag_data in tags_data:
                tag, _ = Tag.objects.get_or_create(name=tag_data['name'])
                instance.tags.add(tag)
        instance.destinationLink = validated_data.get('destinationLink', instance.destinationLink)
        instance.save()
        return instance


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)

        profile = UserProfile.objects.create(user=user, **validated_data)
        return profile

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user = instance.user
        for key, value in user_data.items():
            setattr(user, key, value)
        user.save()
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance