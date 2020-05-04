from rest_framework import serializers

from djoser.serializers import TokenCreateSerializer as DjoserTokenCreateSerializer
from djoser.serializers import (
    UserCreatePasswordRetypeSerializer as DjoserUserCreateSeralizer,
)

from .models import User


class TokenCreateSerializer(DjoserTokenCreateSerializer):
    remember_me = serializers.BooleanField(default=False)


class UserCreateSerializer(DjoserUserCreateSeralizer):
    def validate_email(self, email):
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError(
                "A user is already registered with that email"
            )
        return email
