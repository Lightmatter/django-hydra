{% if cookiecutter.django_registration == 'n' %}

    from djoser.views import (
    {%- if cookiecutter.djoser != 'basic' -%}
        SetPasswordView as DjoserSetPasswordView,
        PasswordResetView as DjoserPasswordResetView,
        PasswordResetConfirmView as DjoserPasswordResetConfirmView,
        ActivationView as DjoserActivationView
        SetUsernameView as DjoserSetUsernameView,
    {%- endif -%}
        RegistrationView as DjoserUserRegistrationView,
        LoginView as DjoserLoginView,
        LogoutView as DjoserLogoutView,
        UserView as DjoserUserView
    )



    # Primary User Views


    class LoginView(DjoserLoginView):
        pass

    class LogoutView(DjoserLogoutView):
        pass

    class RegistrationView(DjoserRegistrationView):
        pass

    class UserView(DjoserUserView):
        pass


    {%- if cookiecutter.djoser|lower != 'basic' -%}

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

{% else %}

from django.shortcuts import render
from djoser.views import (
    RegistrationView as DjoserUserRegistrationView,
    SetPasswordView as DjoserSetPasswordView,
    LoginView as DjoserLoginView,
    LogoutView as DjoserLogoutView,
    PasswordResetView as DjoserPasswordResetView,
    PasswordResetConfirmView as DjoserPasswordResetConfirmView,
    ActivationView as DjoserActivationView
    SetUsernameView as DjoserSetUsernameView
    UserView as DjoserUserView
)



# Primary User Views

class LoginView(DjoserLoginView):
    pass

class LogoutView(DjoserLogoutView):
    pass

class RegistrationView(DjoserRegistrationView):
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
