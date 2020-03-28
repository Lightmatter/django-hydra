{%- if cookiecutter.django_registration == 'y' -%}
from django.contrib.auth import REDIRECT_FIELD_NAME, get_user_model  # NOQA
from django.contrib.auth.forms import AuthenticationForm  # NOQA
from django.contrib.auth.views import LoginView as DjangoLoginView  # NOQA

from registration.backends.simple.views import (
    RegistrationView as SimpleRegistrationView,
)

from .forms import RegistrationForm


# Make sure the view's base class matches the backend we're importing from
# class RegistrationView(DefaultRegistrationView):
class RegistrationView(SimpleRegistrationView):
    """ The class view that handles user registration. See
    https://bitbucket.org/ubernostrum/django-registration/src/8f242e35ef7c004e035e54b4bb093c32bf77c29f/registration/backends/simple/views.py?at=default#cl-11
    for an example of a simple way to use it
    """

    form_class = RegistrationForm

    # Stick extra registration logic here
    def register(self, form, **cleaned_data):  # NOQA
        new_user = super().register(form, **cleaned_data)
        return new_user

    def get_success_url(self, user):  # NOQA
        """
        Return the url a user should be redirected to after registration
        """
        return self.request.GET.get("next", "/")


class LoginView(DjangoLoginView):
    pass
{% endif %}
