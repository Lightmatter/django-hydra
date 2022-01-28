# Create your views here.

from django.template.response import TemplateResponse

from django.contrib import messages


def error(request):
    """Generate an exception. Useful for e.g. configuring Sentry"""
    raise Exception("Make response code 500!")


def current_time(request):
    """Generate the current time. Useful for testing htmx"""
    messages.info(request, "updated the current time")
    return TemplateResponse(request, "current_time.html")
