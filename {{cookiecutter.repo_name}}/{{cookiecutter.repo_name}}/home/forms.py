import datetime
import re

from django import forms
from django.contrib.auth import authenticate
from django.forms import ModelForm, widgets
from django.forms.models import BaseInlineFormSet
from django.forms.extras.widgets import SelectDateWidget

from django.utils.translation import ugettext_lazy as _

from parsley.decorators import parsleyfy

class StripeTokenForm(forms.Form):
    id = forms.CharField()


class ChargeForm(forms.Form):
    amount = forms.DecimalField(max_digits=5, decimal_places=2)

@parsleyfy
class UserForm(forms.Form):
    name = forms.CharField(min_length=3, max_length=30)
    email = forms.EmailField()
    email2 = forms.EmailField(required=False)
    age = forms.IntegerField()
    income = forms.DecimalField()

    def good_to_go(self):
    	pass
