from django.urls import include, path

from . import views

urlpatterns = [
    path('group', views.group, name='group'),
    path('view', views.view, name='view'),
    path('track', views.track, name='track'),
]