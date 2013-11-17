from django.conf.urls import patterns, include, url
from django.views.generic.base import TemplateView


urlpatterns = patterns('app.views',
    # Examples:
    url(r'^error/', 'error', name='error'),
    url(r'^404/', '_404', name='404'),
    url(r'^$', 'index', name='index'),

)

from .signals import * #ensure that the signals are attatched via import
