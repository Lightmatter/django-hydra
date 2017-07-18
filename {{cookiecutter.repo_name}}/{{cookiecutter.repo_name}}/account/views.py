{% if cookiecutter.django_registration == 'y' %}

from django.contrib.auth import login as auth_login  # NOQA
from django.contrib.auth import logout as auth_logout  # NOQA
from django.contrib.auth import REDIRECT_FIELD_NAME, get_user_model  # NOQA
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.views import login as django_login

from registration.backends.simple.views import \
    RegistrationView as SimpleRegistrationView

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
    def register(self, form, **cleaned_data):
        new_user = super().register(form, **cleaned_data)
        return new_user

    def get_success_url(self, user):
        """
        Return the url a user should be redirected to after registration
        """
        return self.request.GET.get('next', '/')


def login(request, template_name='registration/login.html',
          redirect_field_name=REDIRECT_FIELD_NAME,
          authentication_form=AuthenticationForm,
          extra_context=None):
    return django_login(request, template_name,
                        redirect_field_name,
                        authentication_form,
                        extra_context)
{% endif -%}
