from allauth.account.adapter import DefaultAccountAdapter
from django.http import HttpResponseRedirect
from django.urls import reverse
from django_htmx.http import HttpResponseClientRedirect


class HTMXAccountAdapter(DefaultAccountAdapter):
    def respond_email_verification_sent(self, request, user):
        url = reverse("account_email_verification_sent")
        if request.htmx:
            return HttpResponseClientRedirect(url)
        return HttpResponseRedirect(url)
