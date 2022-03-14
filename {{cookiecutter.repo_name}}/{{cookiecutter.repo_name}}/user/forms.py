from allauth.account.forms import (
    LoginForm as AllAuthLoginForm,
    SignupForm as AllAuthSignupForm,
)
from django import forms
from django.utils.translation import gettext_lazy as _

from .models import User


class HasAccountForm(forms.Form):
    email = forms.EmailField(help_text=_("We won't spam you"), required=True)

    def clean_email(self):
        data = self.cleaned_data["email"]
        return data.lower()


class LoginForm(AllAuthLoginForm):
    template_name = "account/login_form.html"
    remember = forms.BooleanField(
        help_text=_("For 2 weeks"),
        label=_("Remember Me"),
        required=False,
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["login"].widget = forms.HiddenInput()


class SignupForm(AllAuthSignupForm):
    template_name = "account/signup_form.html"

    first_name = forms.CharField(
        label=_("First Name"),
        min_length=1,
        max_length=User._meta.get_field("first_name").max_length,
        widget=forms.TextInput(
            attrs={"placeholder": _("First Name"), "autocomplete": "given-name"}
        ),
    )

    last_name = forms.CharField(
        label=_("Last Name"),
        min_length=1,
        max_length=User._meta.get_field("last_name").max_length,
        widget=forms.TextInput(
            attrs={"placeholder": _("Last Name"), "autocomplete": "family-name"}
        ),
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["email"].widget.attrs["readonly"] = True
        self.fields["email"].label = "Email"
        self.fields["email2"].label = "Confirm Email"
        self.fields["password2"].label = "Confirm Password"
