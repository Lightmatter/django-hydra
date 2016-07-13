# Create your views here.

from django.http import HttpResponse, Http404, HttpResponseRedirect, HttpResponseBadRequest
from django.contrib.auth import authenticate, login, logout
from django.conf import settings

from django.contrib.auth.decorators import login_required

from .forms import StripeTokenForm, ChargeForm


def error(request):
    """Generate an exception. Useful for e.g. configuing Sentry"""
    raise Exception
