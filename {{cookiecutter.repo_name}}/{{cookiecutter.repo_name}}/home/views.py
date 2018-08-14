# Create your views here.

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic.edit import FormView
# from django.views.generic.list import ListView
# from django.views.generic.detail import DetailView
from .forms import UserForm


@method_decorator(login_required, name='dispatch')
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
