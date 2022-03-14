from allauth.account.views import (
    LoginView as AllAuthLoginView,
    SignupView as AllAuthSignupView,
)
from django.contrib.auth.mixins import LoginRequiredMixin
from django.template.response import TemplateResponse
from django.views.generic import RedirectView
from django_htmx.http import HttpResponseClientRedirect

from .forms import HasAccountForm
from .models import User


class UserRedirectView(LoginRequiredMixin, RedirectView):

    permanent = False

    def get(self, request, *args, **kwargs):
        url = self.get_redirect_url(*args, **kwargs)
        if request.htmx:
            return HttpResponseClientRedirect(url)
        return super().get(request, *args, **kwargs)

    def get_redirect_url(self, *args, **kwargs):
        return "/"


user_redirect_view = UserRedirectView.as_view()


class SignupView(AllAuthSignupView):
    def get_initial(self):
        """Return the initial data to use for forms on this view."""
        email = self.request.GET.get("email", "")
        data = self.initial.copy()
        data["email"] = email
        return data


signup = SignupView.as_view()


class LoginView(AllAuthLoginView):
    def get_context_data(self, *args, **kwargs):
        ctx = super().get_context_data(*args, **kwargs)
        if hasattr(self.request, "prefetched_user"):
            user = self.request.prefetched_user
        else:
            user = User.objects.get(email__iexact=self.get_form().data["login"])
        ctx["user"] = user
        return ctx

    def get_initial(self):
        """Return the initial data to use for forms on this view."""
        email = self.request.GET.get("email", "")
        data = self.initial.copy()
        data["login"] = email
        return data


login = LoginView.as_view()


def welcome(request):
    if not request.htmx or "email" not in request.GET:
        return TemplateResponse(request, "account/welcome.html", {"form": HasAccountForm()})

    form = HasAccountForm(request.GET)
    if not form.is_valid():
        return TemplateResponse(request, "account/welcome.html", {"form": form})

    try:
        email = form.cleaned_data.get("email")
        request.prefetched_user = User.objects.get(email=email)
        return login(request)
    except User.DoesNotExist:
        return signup(request)
