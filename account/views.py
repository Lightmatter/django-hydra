from django.shortcuts import render

from registration.backends.simple.views import RegistrationView as SimpleRegistrationView
from registration.backends.default.views import RegistrationView as DefaultRegistrationView


from .forms import RegistrationForm


## Make sure the view's base class matches the backend we're importing from
#class RegistrationView(DefaultRegistrationView):
class RegistrationView(SimpleRegistrationView):
    """ The class view that handles user registration. See
    https://bitbucket.org/ubernostrum/django-registration/src/8f242e35ef7c004e035e54b4bb093c32bf77c29f/registration/backends/simple/views.py?at=default#cl-11
    for an example of a simple way to use it
    """
    form_class = RegistrationForm

    ##Stick extra registration logic here
    def register(self, request, form, **cleaned_data):
        new_user = super(RegistrationView, self).register(request, form, **cleaned_data)
        return new_user

    def get_success_url(self, request, user):
        """
        Return the url a user should be redirected to after registration
        """
        return request.GET.get('next', '/')
