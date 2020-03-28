from django.urls import include, path

from django.contrib.auth import urls as auth_urls  # NOQA
{%- if cookiecutter.use_djoser == "y" %}
from .api_views import (
    APIRegistrationView,
    LoginView,
    LogoutView,
    PasswordResetConfirmView,
    PasswordResetView,
)
{% endif %}

from .views import LoginView, RegistrationView  # NOQA

urlpatterns = []

{%- if cookiecutter.django_registration == "y" %}

urlpatterns.extend(
    [
        path(r"login/", LoginView.as_view(), name="login"),
        path(r"member/register/", RegistrationView.as_view(), name="register"),
        path(r"", include(auth_urls)),
    ]
)
{%- endif %}
{%- if cookiecutter.use_djoser == "y" %}

urlpatterns.extend([
    path(r"api/login/", LoginView.as_view(), name="api-login"),
    path(r"api/register/",
         APIRegistrationView.as_view(),
         name="api-register"),
    path(r"logout/", LogoutView.as_view(), name="user-logout"),
    path(r"register/user/", APIRegistrationView.as_view(), name="user-register"),
    path(r"password/reset/", PasswordResetView.as_view(), name="password-reset"),
    path(r"password/reset/confirm/", PasswordResetConfirmView.as_view(), name="password-confirm"),
    path(r"", include(auth_urls)),
])
{%- endif %}
