# Create your views here.

from django.http import HttpResponse, Http404, HttpResponseRedirect, HttpResponseBadRequest
from django.contrib.auth import authenticate, login, logout
from django.conf import settings

from django.contrib.auth.decorators import login_required

from .forms import StripeTokenForm, ChargeForm, UserForm
from django.views.generic.edit import FormView


class ExampleFormView(FormView):
	form_class = UserForm
	template_name = 'example_form.html'
	success_url = "/form"
	def form_valid(self, form):
		form.good_to_go()
		return super(ExampleFormView, self).form_valid(form)

def error(request):
    """Generate an exception. Useful for e.g. configuing Sentry"""
    raise Exception
