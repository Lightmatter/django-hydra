from django.conf.urls import include, url
from django.contrib.auth import urls as auth_urls

from .views import (LoginView, LogoutView, PasswordResetConfirmView,  # NOQA
                    PasswordResetView, RegistrationView, login)

urlpatterns = []

{%- if cookiecutter.django_registration == 'y' %}

urlpatterns.extend([
    url(r'^login/$', login, name='login'),
    url(r'^member/register/$',
        RegistrationView.as_view(),
        name='register'),
    url(r'', include(auth_urls)),
])

{%- endif %}

{% if cookiecutter.use_djoser == 'y' -%}

urlpatterns.extend([
    url(r'^login/', LoginView.as_view(), name='user-login'),
    url(r'^logout/', LogoutView.as_view(), name='user-logout'),
    url(r'^register/user/', RegistrationView.as_view(), name='user-register'),
    url(r'^password/reset/$', PasswordResetView.as_view(), name='password-reset'),
    url(r'^password/reset/confirm/$', PasswordResetConfirmView.as_view(), name='password-confirm'),
])
{%- endif %}
