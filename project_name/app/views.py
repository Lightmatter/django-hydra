# Create your views here.
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.conf import settings

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
