from django.conf.urls import patterns, include, url
from django.views.generic.base import TemplateView


urlpatterns = patterns('app.views',
    # Examples:
    #url(r'^login/', 'error', name='error'),
    url(r'^logout/', 'error', name='error'),
    url(r'^signup/', '_404', name='404'),
    url(r'^forgot-password/$', 'index', name='index'),
    (r'', include('registration.backends.default.urls')),   #

)
