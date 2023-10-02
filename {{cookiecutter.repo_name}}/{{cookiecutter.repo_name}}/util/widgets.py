from django.forms.widgets import CheckboxInput


class ToggleWidget(CheckboxInput):
    """
    Change a CheckboxInput to a Toggle widget

    This will use the html file toggle.html which calls a jinja macro toggle()

    It is modeled after: https://alpinejs.dev/component/toggle

    Usage:
    agree_terms = forms.BooleanField(widget=ToggleWidget, required=True, label="Agree to terms")
    """

    input_type = "toggle"
    template_name = "django/forms/widgets/toggle.html"
