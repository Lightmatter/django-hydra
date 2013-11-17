from django.conf.urls import patterns, include, url
from django.views.generic.base import TemplateView


urlpatterns = patterns('app.views',
    (r'', include('registration.backends.default.urls')),   #
)
