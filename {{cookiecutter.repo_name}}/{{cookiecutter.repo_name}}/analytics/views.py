import os
import uuid
from django.apps import AppConfig
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response

import analytics

def get_client_ip(request):
  x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
  if x_forwarded_for:
      ip = x_forwarded_for.split(',')[0]
  else:
      ip = request.META.get('REMOTE_ADDR')
  return ip

# Alias call for Segment
# TODO make a new file `signals.py` 
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])  
def alias(request):
  if request.method == 'POST':
    auth_user_hash = request.session['_auth_user_hash'] or None

    if 'anonymous_id' in request.data and auth_user_hash is not None:
      analytics.alias(request.data['anonymous_id'], auth_user_hash)

    return Response({
      "status": 200 
    }, status=status.HTTP_200_OK)
  else:
    return Response({}, status=status.HTTP_400_BAD_REQUEST)

# Group call for Segment
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])  
def group(request):
  if request.method == 'POST':  
    auth_user_hash = request.session['_auth_user_hash'] or None

    if (auth_user_hash is not None or request.data['anonymous_id'] is not None) and request.data['group_id'] is not None:
      analytics.group(
        auth_user_hash or request.data['anonymous_id'],
        request.data['group_id'],
        request.data['traits'],
        request.data['context'],
        request.data['timestamp'], # null from frontend
        request.data['anonymous_id'],
        request.data['integrations']
      )

    return Response({
      "status": 200
    }, status=status.HTTP_200_OK)
  else:
    return Response({}, status=status.HTTP_400_BAD_REQUEST)


# Get randomly generated uuid for client-side identification
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def generateId(request):
  if request.method == 'GET':
    uuid = request.session.session_key
    
    if not uuid:
      request.session.create()
      uuid = request.session.session_key

    return Response({
      "uuid": uuid
    }, status=status.HTTP_200_OK)
  else:
    return Response({}, status=status.HTTP_400_BAD_REQUEST)

# Identify call for Segment
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])  
def identify(request):
  if request.method == 'POST':
    auth_user_hash = None

    if '_auth_user_hash' in request.session: # only true if logged in
      auth_user_hash = request.session['_auth_user_hash']

    anonymous_id = request.data['anonymous_id']
    traits = request.data['traits'] # do we want to leverage server side traits (from the db here?)
    
    if (auth_user_hash is not None or anonymous_id is not None) and traits is not None:
      analytics.identify(auth_user_hash or anonymous_id, traits)

    return Response({
      "status": 200
    }, status=status.HTTP_200_OK)
  else:
    return Response({}, status=status.HTTP_400_BAD_REQUEST)

# Page or Screen View Event
@api_view(['POST'])
@authentication_classes([])
@permission_classes([]) 
def view(request):
  if request.method == 'POST':
    if 'name' in request.data:
      request.data['context']["ip"] = get_client_ip(request)
      
      auth_user_hash = None
      if '_auth_user_hash' in request.session: # only true if logged in
        auth_user_hash = request.session['_auth_user_hash']

      payload = [
        auth_user_hash or request.data['anonymous_id'],
        request.data['category'],
        request.data['name'],
        request.data['properties'],
        request.data['context'],
        request.data['timestamp'], # null from frontend
        request.data['anonymous_id'],
        request.data['integrations']
      ]

      if request.data['event_type'] == 'pageView':
        analytics.page(*payload)
      elif request.data['event_type'] == 'screenView':
        analytics.screen(*payload)

      return Response({
        "status": 200
      }, status=status.HTTP_200_OK)
    else:
      return Response({
        "status": 400,
        "error": ""
      }, status=status.HTTP_400_BAD_REQUEST)
  else:
    return Response({}, status=status.HTTP_400_BAD_REQUEST)

# Tracking call for Segment
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])  
def track(request):
  if request.method == 'POST':    
    if 'event' in request.data:
      request.data['context']["ip"] = get_client_ip(request)

      auth_user_hash = None
      if '_auth_user_hash' in request.session: # only true if logged in
        auth_user_hash = request.session['_auth_user_hash']
      
      analytics.track(
        auth_user_hash or request.data['anonymous_id'],
        request.data['event'],
        request.data['properties'],
        request.data['context'],
        request.data['timestamp'], # null from frontend
        request.data['anonymous_id'],
        request.data['integrations']
      )

    return Response({
      "status": 200
    }, status=status.HTTP_200_OK)
  else:
    return Response({}, status=status.HTTP_400_BAD_REQUEST)