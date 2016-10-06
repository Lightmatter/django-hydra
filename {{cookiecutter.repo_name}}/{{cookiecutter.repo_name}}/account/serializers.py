from djoser.serializers import UserRegistrationSerializer as DjoserUserRegistrationSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token



class UserRegistrationSerializer(DjoserUserRegistrationSerializer):
    pass