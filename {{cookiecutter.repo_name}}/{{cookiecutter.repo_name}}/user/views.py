from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import RedirectView


class UserRedirectView(LoginRequiredMixin, RedirectView):

    permanent = False

    def get_redirect_url(self):
        return '/'


user_redirect_view = UserRedirectView.as_view()
