from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Profile
from workspaces.serializers import GetWorkspaceSerializer

User = get_user_model()

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
      model = User
      fields = ('first_name', 'last_name', 'email', 'password')


    def validate(self, data):
        user = User(**data)
        password = data.get('password')

        try:
            validate_password(password, user)
        except exceptions.ValidationError as e:
            serializer_errors = serializers.as_serializer_error(e)
        raise exceptions.ValidationError(
            {'password': serializer_errors['non_field_errors']}
        )

        return data


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.avatar = get_gravatar(validated_data.get('email'))
        user.save()

        return user


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('first_name', 'last_name', 'email', 'avatar')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class GetProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    workspaces = GetWorkspaceSerializer(many=True)

    class Meta:
        model = Profile
        fields = [
            'id','user', 'profession', 'skills', 
            'bio', 'github', 'youtube', 'twitter', 
            'facebook', 'linkedin', 'instagram', 'workspaces',
        ]
