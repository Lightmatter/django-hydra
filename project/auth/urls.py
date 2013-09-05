from django.conf.urls import patterns, include, url
from django.views.generic.base import TemplateView

urlpatterns = patterns('',
    url(r'^login/$', 'django.contrib.auth.views.login', name="login", ),
    url(r'^password_change/$',
        'django.contrib.auth.views.password_change',
        {'post_change_redirect':'/'},
        name="password_change", ),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page':'/'}, name="logout", ),
    url(r'', include('registration.backends.default.urls'))
)
