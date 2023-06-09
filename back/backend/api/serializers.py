from rest_framework import serializers
from django.db import models
from api.models import User,Tag,USER_STATUS_CHOICES

from api.models import Pin, UserProfile, Album

from api.validators import EmptyStringURLValidator
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id','name',)

        extra_kwargs = {
            'id': {'required': False}
        }




class PinSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=False,required=False)
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False)
    contentUrl = serializers.URLField(required=False,validators=[EmptyStringURLValidator()])
    content = serializers.ImageField(required=False)
    timeUploaded = serializers.DateTimeField(allow_null=True,required=False)
    # It will not show up in response
    # user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    user = UserSerializer(read_only=True)
    # For using existing user without creating a new one
    # user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    tags = TagSerializer(many=True,required=False )
    destinationLink = serializers.URLField(required=False, allow_blank=True,validators=[EmptyStringURLValidator()])

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

        print("From pin ser, time upload: " + str(pin.timeUploaded))

        return pin

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.contentUrl = validated_data.get('contentUrl', instance.contentUrl)
        instance.content = validated_data.get('content',instance.content)
        instance.timeUploaded = validated_data.get('timeUploaded', instance.timeUploaded)
        tags_data = validated_data.get('tags')



        if tags_data:
            instance.tags.clear()
            for tag_data in tags_data:
                tag, _ = Tag.objects.get_or_create(name=tag_data['name'])
                instance.tags.add(tag)
                print("Hi")
        instance.destinationLink = validated_data.get('destinationLink', instance.destinationLink)
        instance.save()
        return instance


class UserProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user = UserSerializer(read_only=True)
    avatar = serializers.ImageField(read_only=True)  # Make 'avatar' field read-only
    email = serializers.EmailField(read_only=True)

    class Meta:
        model = UserProfile
        fields = ('id','user','email','avatar')

    def to_internal_value(self, data):
        user_data = data.get('user')
        email = data.get('email')
        # Add any additional fields that need to be processed here

        validated_data = super().to_internal_value(data)

        if user_data:
            validated_data['user'] = user_data
        if email:
            validated_data['email'] = email
        # Add any additional fields to the validated_data dictionary

        return validated_data

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        try:
            user = User.objects.get(username=user_data['username'])
        except User.DoesNotExist:
            user = User.objects.create_user(**user_data)
        else:
            # Handle case where user already exists, e.g. update user fields
            pass
        validated_data['user'] = user
        profile = UserProfile.objects.create(**validated_data)
        return profile

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        email = validated_data.pop('email', None)

        if user_data:
            user = instance.user
            for key, value in user_data.items():
                setattr(user, key, value)
            user.save()

        if email:
            setattr(instance, 'email', email)

        for key, value in validated_data.items():
            setattr(instance, key, value)

        instance.save()
        return instance


class AlbumSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    # pins = serializers.ListField(child=serializers.PrimaryKeyRelatedField(queryset=Pin.objects.all()))
    pins = PinSerializer(read_only=True,many=True)
    # user = UserSerializer()
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    def create(self, validated_data):
        pins_data = validated_data.pop('pins', [])
        album = Album.objects.create(**validated_data)

        # Create pins and add them to album
        pins = Pin.objects.filter(pk__in=pins_data)
        album.pins.set(pins)

        return album

    def update(self, instance, validated_data):
        pins_data = validated_data.pop('pins', [])

        # Update album fields
        instance.name = validated_data.get('name', instance.name)
        instance.user = validated_data.get('user', instance.user)
        instance.save()

        # Update or create pins and add them to album
        # for pin_pk in pins_data:
        #     try:
        #         pin = Pin.objects.get(pk=pin_pk)
        #         pin.title = pin_data.get('title', pin.title)
        #         pin.description = pin_data.get('description', pin.description)
        #         pin.contentUrl = pin_data.get('contentUrl', pin.contentUrl)
        #         pin.timeUploaded = pin_data.get('timeUploaded', pin.timeUploaded)
        #         pin.save()
        #     except Pin.DoesNotExist:
        #         pin = Pin.objects.create(pk=pin_pk, **pin_data)
        for pin_data in pins_data:
            pin_id = pin_data.pop('id', None)  # Get the id field

            if pin_id:
                pin = Pin.objects.get(id=pin_id)
                # Update the fields of the existing pin instance
                pin.title = pin_data.get('title', pin.title)
                pin.description = pin_data.get('description', pin.description)
                pin.contentUrl = pin_data.get('contentUrl', pin.contentUrl)
                pin.timeUploaded = pin_data.get('timeUploaded', pin.timeUploaded)
                pin.save()
            else:
                # Create a new pin instance
                pin = Pin.objects.create(**pin_data)



            instance.pins.add(pin)

        return instance

