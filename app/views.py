# Create your views here.
from decimal import *

from django.http import HttpResponse, Http404, HttpResponseRedirect, HttpResponseBadRequest
from django.contrib.auth import authenticate, login, logout
from django.conf import settings

from django.contrib.auth.decorators import login_required

from annoying.decorators import render_to, ajax_request

from .forms import StripeTokenForm, ChargeForm


def error(request):
    """for testing purposes"""
    raise Exception
