# Create your views here.

from django.contrib import messages
from django.template.response import TemplateResponse
from django.views.defaults import (
    bad_request,
    page_not_found,
    permission_denied,
    server_error,
)
from django_htmx.http import HttpResponseClientRedirect, HttpResponseClientRefresh


def error(request):
    """Generate an exception. Useful for e.g. configuring Sentry"""
    raise Exception("Make response code 500!")


def current_time(request):
    """Generate the current time. Useful for testing htmx"""
    messages.info(request, "updated the current time")
    return TemplateResponse(request, "samples/current_time.jinja")


def test_message_redirect(request):
    messages.info(request, "testing redirect")
    return HttpResponseClientRedirect("/")


def test_message_refresh(request):
    messages.info(request, "testing refresh")
    return HttpResponseClientRefresh()


def FourHundy(request, exception):
    return bad_request(request, exception, template_name="400.jinja")


def FourOhThree(request, exception):
    return permission_denied(request, exception, template_name="403.jinja")


def FourOhFour(request, exception):
    return page_not_found(request, exception, template_name="404.jinja")


def WorkedLocally(request):
    return server_error(request, template_name="500.jinja")
