import re

from django import forms
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import get_user_model

User = get_user_model()

class RegistrationForm(forms.Form):
    """
    Form for registering a new user account.
    """
    username = forms.CharField(widget=forms.HiddenInput,required=False)

    email = forms.EmailField(label=_("E-mail"), required=True)
    password1 = forms.CharField(widget=forms.PasswordInput,
                                label=_("Password"))
    password2 = forms.CharField(widget=forms.PasswordInput,
                                label=_("Password (again)"))

    tos = forms.BooleanField(widget=forms.CheckboxInput,
                             label=_(u'I have read and agree to the Terms of Service'),
                             error_messages={'required': _("You must agree to the terms to register")})

    def clean(self):
        """
        Verifiy that the values entered into the two password fields
        match. Note that an error here will end up in
        ``non_field_errors()`` because it doesn't apply to a single
        field.

        """
        if 'password1' in self.cleaned_data and 'password2' in self.cleaned_data:
            if self.cleaned_data['password1'] != self.cleaned_data['password2']:
                raise forms.ValidationError(_("The two password fields didn't match."))
        username = (self.cleaned_data.get('email', "bad@email.com").split("@")[0]).lower()
        username = re.sub('\W', "", username)

        otherusers = User.objects.filter(username__startswith=username).count()
        username = username + str(otherusers)
        self.cleaned_data['username'] = username
        return self.cleaned_data


    def clean_email(self):
        """
        Validate that the supplied email address is unique for the
        site.

        """
        if User.objects.filter(email__iexact=self.cleaned_data['email']):
            raise forms.ValidationError(_("This email address is already in use. Please supply a different email address."))
        return self.cleaned_data['email']
