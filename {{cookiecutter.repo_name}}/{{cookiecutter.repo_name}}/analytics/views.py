import os
import uuid
from django.apps import AppConfig
from django.dispatch import receiver
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response

import analytics
from django.contrib.auth.signals import user_logged_in
from ipware import get_client_ip

from {{cookiecutter.repo_name}}.account.models import User


# Helpers #
def getUserByEmail(request):
    email = request.data["email"]
    return User.objects.filter(email__iexact=email)[0]


def getSessionKeyUUID(request):
    uuid = request.session.session_key
    if not uuid:
        request.session.create()
        uuid = request.session.session_key

    return uuid


# Alias call for Segment
def alias(request, user):
    uuid = getSessionKeyUUID(request)
    analytics.alias(uuid, user.id)


# Identify call for Segment
def identify(user):
    analytics.identify(
        user.id,
        {
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "last_login": user.last_login,
            "created": user.created,
            "modified": user.modified,
            "is_active": user.is_active,
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser,
        }
    )


# Group call for Segment
@api_view(["POST"])
@authentication_classes([])
@permission_classes([])
def group(request):
    if request.method == "POST":
        user = getUserByEmail(request)
        uuid = getSessionKeyUUID(request)

        analytics.group(
            user.id or None,
            request.data["group_id"],
            request.data["traits"],
            request.data["context"],
            request.data["timestamp"],  # null from frontend
            uuid,
            request.data["integrations"],
        )

        return Response({ "status": 200 }, status=status.HTTP_200_OK)
    else:
        return Response({ "error": "only POST requests allowed" }, status=status.HTTP_400_BAD_REQUEST)


# Identify call for Segment
@receiver(user_logged_in)
def loginOrRegister(request, **kwargs):
    user = getUserByEmail(request)

    identify(user)
    alias(request, user)


# Page or Screen View Event
@api_view(["POST"])
@authentication_classes([])
@permission_classes([])
def view(request):
    if request.method == "POST":
        if "name" in request.data:
            user = getUserByEmail(request)
            uuid = getSessionKeyUUID(request)

            request.data["context"]["ip"], is_routable = get_client_ip(request)

            payload = [
                user.id or None,
                request.data["category"],
                request.data["name"],
                request.data["properties"],
                request.data["context"],
                request.data["timestamp"],  # null from frontend
                uuid,
                request.data["integrations"],
            ]

            if request.data["event_type"] == "pageView":
                analytics.page(*payload)
            elif request.data["event_type"] == "screenView":
                analytics.screen(*payload)

            return Response({"status": 200}, status=status.HTTP_200_OK)
        else:
            return Response(
                { "status": 400, "error": "name field is missing from payload" }, status=status.HTTP_400_BAD_REQUEST
            )
    else:
        return Response({ "error": "only POST requests allowed" }, status=status.HTTP_400_BAD_REQUEST)


# Tracking call for Segment
@api_view(["POST"])
@authentication_classes([])
@permission_classes([])
def track(request):
    if request.method == "POST":
        if "event" in request.data:
            user = getUserByEmail(request)
            uuid = getSessionKeyUUID(request)

            request.data["context"]["ip"], is_routable = get_client_ip(request)

            analytics.track(
                user.id or None,
                request.data["event"],
                request.data["properties"],
                request.data["context"],
                request.data["timestamp"],  # null from frontend
                uuid,
                request.data["integrations"],
            )

            return Response({"status": 200}, status=status.HTTP_200_OK)
        else:
            return Response(
                { "status": 400, "error": "event field is missing from payload" }, status=status.HTTP_400_BAD_REQUEST
            )
    else:
        return Response({ "error": "only POST requests allowed" }, status=status.HTTP_400_BAD_REQUEST)
