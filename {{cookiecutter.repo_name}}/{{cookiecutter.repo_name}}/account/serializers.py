from rest_framework import exceptions, serializers
from djoser.serializers import TokenCreateSerializer as DjoserTokenCreateSerializer


class TokenCreateSerializer(DjoserTokenCreateSerializer):
    remember_me = serializers.BooleanField(default=False)
