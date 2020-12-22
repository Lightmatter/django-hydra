from django.urls import include, path

from . import views

urlpatterns = [
    path('alias', views.alias, name='alias'),
    path('group', views.group, name='group'),
    path('identify', views.identify, name='identify'),
    path('id/generate', views.generateId, name='generateId'),
    path('view', views.view, name='view'),
    path('track', views.track, name='track'),
]