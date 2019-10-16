{%- if cookiecutter.use_djoser == 'y' %}

from rest_framework import serializers

from djoser.views import ActivationView as DjoserActivationView
from djoser.views import LoginView as DjoserLoginView
from djoser.views import LogoutView as DjoserLogoutView
from djoser.views import PasswordResetConfirmView as DjoserPasswordResetConfirmView
from djoser.views import PasswordResetView as DjoserPasswordResetView
from djoser.views import RegistrationView as DjoserUserRegistrationView
from djoser.views import SetPasswordView as DjoserSetPasswordView
from djoser.views import SetUsernameView as DjoserSetUsernameView
from djoser.views import UserView as DjoserUserView

 from djoser.serializers import \
    UserRegistrationSerializer as DjoserUserRegistrationSerializer


class UserRegistrationSerializer(DjoserUserRegistrationSerializer):
    pass

# Primary User Views


class LoginView(DjoserLoginView):
    pass


class LogoutView(DjoserLogoutView):
    pass


class APIRegistrationView(DjoserUserRegistrationView):
    pass


class UserView(DjoserUserView):
    pass


# Utility User Views


class SetUserPassword(DjoserSetPasswordView):
    pass


class SetUsernameView(DjoserSetUsernameView):
    pass


class PasswordResetView(DjoserPasswordResetView):
    pass


class PasswordResetConfirmView(DjoserPasswordResetConfirmView):
    pass


class ActivationView(DjoserActivationView):
    pass
{%- endif -%}
