from django import forms


class StripeTokenForm(forms.Form):
    id = forms.CharField()


class ChargeForm(forms.Form):
    amount = forms.DecimalField(max_digits=5, decimal_places=2)


class UserForm(forms.Form):
    name = forms.CharField(min_length=3, max_length=30, help_text="Type your full name")
    email = forms.EmailField(help_text="Enter your email address")
    age = forms.IntegerField(help_text="Enter your age")

    def clean_name(self):
        if len(self.data["name"]) < 5:
            raise forms.ValidationError("Is your name really that short?")
        if len(self.data["name"].split(" ")) < 2:
            raise forms.ValidationError("Your full name please.")

    def good_to_go(self):
        pass
