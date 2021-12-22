from django.views.generic import RedirectView

from django.contrib.auth.mixins import LoginRequiredMixin


class UserRedirectView(LoginRequiredMixin, RedirectView):

    permanent = False

    def get_redirect_url(self):
        return "/"


user_redirect_view = UserRedirectView.as_view()
