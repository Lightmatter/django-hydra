# Create your views here.

from django.template.response import TemplateResponse


def error(request):
    """Generate an exception. Useful for e.g. configuing Sentry"""
    raise Exception("Make response code 500!")


def current_time(request):
    """Generate the current time. Useful for testing htxm"""
    return TemplateResponse(request, "current_time.html")
