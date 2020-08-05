# Create your views here.

# from django.views.generic.base import TemplateView
# from django.views.generic.edit import FormView
# from django.contrib.auth.decorators import login_required
# from django.utils.decorators import method_decorator

# from django.views.generic.list import ListView
# from django.views.generic.detail import DetailView


def error(request):
    """Generate an exception. Useful for e.g. configuing Sentry"""
    raise Exception("Make response code 500!")
