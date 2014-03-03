# Create your views here.
from decimal import *

from django.http import HttpResponse, Http404, HttpResponseRedirect, HttpResponseBadRequest
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.conf import settings


from payments.models import Customer
from annoying.decorators import render_to, ajax_request

@render_to('index.html')
def index(request):
    return {}

def error(request):
    """for testing purposes"""
    raise Exception

def _404(request):
    """for testing purposes"""
    raise Http404

@render_to('login.html')
def login_view(request):
    return {}

def logout_view(request):
    pass

@render_to('register.html')
def registration(request):
    return {}

@ajax_request
@login_required
def create_customer(request):
    form = StripeTokenForm(request.POST)
    if not form.is_valid():
        Return HttpResponseBadRequest()
    card = form.cleaned_data['id']
    customer = Customer.create(request.user, card=card, charge_immediately=False)
    return {}

@login_required
def charge_customer(request):
    customer = request.user.customer
    form = StripeTokenForm(request.POST)
    if not form.is_valid():
        Return HttpResponseBadRequest()

    amount = form.cleaned_data['amount']
    customer.charge(amount, description="{{project_name}}")
    return HttpResponseRedirect("/")
