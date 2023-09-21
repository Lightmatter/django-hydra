from django.forms.widgets import CheckboxInput


class ToggleWidget(CheckboxInput):
    input_type = "toggle"
    template_name = "django/forms/widgets/toggle.html"
