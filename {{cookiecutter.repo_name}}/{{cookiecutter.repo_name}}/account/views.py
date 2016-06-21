{% if cookiecutter.django_registration == 'n' %}

    from djoser.views import (
    {%- if cookiecutter.djoser != 'basic' %}
        SetPasswordView as DjoserSetPasswordView,
        PasswordResetView as DjoserPasswordResetView,
        PasswordResetConfirmView as DjoserPasswordResetConfirmView,
        ActivationView as DjoserActivationView
        SetUsernameView as DjoserSetUsernameView,
    {%- endif %}
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


    {% if cookiecutter.djoser|lower != 'basic' %}

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

    {% endif %}

{% else %}

from django.shortcuts import render

from registration.backends.simple.views import RegistrationView as SimpleRegistrationView
from registration.backends.default.views import RegistrationView as DefaultRegistrationView


from .forms import RegistrationForm


# Make sure the view's base class matches the backend we're importing from
#class RegistrationView(DefaultRegistrationView):
class RegistrationView(SimpleRegistrationView):
    """ The class view that handles user registration. See
    https://bitbucket.org/ubernostrum/django-registration/src/8f242e35ef7c004e035e54b4bb093c32bf77c29f/registration/backends/simple/views.py?at=default#cl-11
    for an example of a simple way to use it
    """
    form_class = RegistrationForm

    # Stick extra registration logic here
    def register(self, form, **cleaned_data):
        new_user = super().register(form, **cleaned_data)
    return new_user

    def get_success_url(self, user):
        """
        Return the url a user should be redirected to after registration
        """
        return self.request.GET.get('next', '/')


class ActivationView(DjoserActivationView):
    pass

{% endif %}