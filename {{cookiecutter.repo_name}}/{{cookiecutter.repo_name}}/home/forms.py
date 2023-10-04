from datetime import datetime

from django import forms

from {{ cookiecutter.repo_name }}.util.widgets import ToggleWidget


class FormTest(forms.Form):
    template_name = "samples/test_form.jinja"

    first_name = forms.CharField(
        label="First Name",
        min_length=1,
        max_length=100,
        widget=forms.TextInput(
            attrs={"placeholder": "First Name", "autocomplete": "given-name"}
        ),
    )
    char = forms.CharField()
    integer = forms.IntegerField()
    email = forms.EmailField()
    url = forms.URLField()
    password = forms.CharField(widget=forms.PasswordInput())

    date_initial = forms.DateField(initial=datetime.now)
    datetime_initial = forms.DateTimeField(initial=datetime.now)
    time_initial = forms.TimeField(initial=datetime.now)
    date_empty = forms.DateField()
    datetime_empty = forms.DateTimeField()
    time_empty = forms.TimeField()

    textarea = forms.CharField(widget=forms.Textarea())

    checkbox = forms.BooleanField()
    toggle = forms.BooleanField(widget=ToggleWidget)
    choice = forms.ChoiceField(choices=[("choice1", "Choice 1"), ("choice2", "Choice 2")])
    radio_choice = forms.ChoiceField(
        choices=[("choice1", "Choice 1"), ("choice2", "Choice 2")], widget=forms.RadioSelect
    )
    file = forms.FileField()

    class Meta:
        fields = "__all__"