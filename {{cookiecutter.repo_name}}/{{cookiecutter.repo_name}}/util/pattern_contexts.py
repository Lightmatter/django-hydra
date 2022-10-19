from django import forms
from pattern_library import register_context_modifier


class ExampleForm(forms.Form):
    single_line_text = forms.CharField(max_length=255, help_text="Help text hhere")
    checkbox = forms.BooleanField(
        help_text="Check for yes, uncheck for no", label="Check Box"
    )
    choices = (("one", "One"), ("two", "Two"), ("three", "Three"), ("four", "Four"))
    select = forms.ChoiceField(choices=choices)
    select.widget.attrs = {"test": "testing"}


@register_context_modifier
def add_common_forms(context, request):
    context["form"] = ExampleForm()


@register_context_modifier
def add_field(context, request):
    form = ExampleForm()
    context["field"] = form["single_line_text"]


@register_context_modifier(template="forms/select.jinja")
def add_select(context, request):
    form = ExampleForm()
    choice_tempate = "django/forms/widgets/select_option.html"
    context["jplwidget"] = form["select"]
    context["jplwidget"].attrs = {"test1": "1", "test2": "2"}
    context["jplwidget"].optgroups = [
        (
            "Sample Group",
            [
                {
                    "template_name": choice_tempate,
                    "attrs": {"option_number": "1"},
                    "label": "Test Label 1",
                    "value": "1",
                },
                {
                    "template_name": choice_tempate,
                    "attrs": {"option_number": "2"},
                    "label": "Test Label 2",
                    "value": "2",
                },
                {
                    "template_name": choice_tempate,
                    "attrs": {"option_number": "3"},
                    "label": "Test Label 3",
                    "value": "3",
                },
            ],
            1,
        ),
    ]


@register_context_modifier(template="forms/checkbox.jinja")
def add_checkbox(context, request):
    form = ExampleForm()
    context["checkfield"] = form["checkbox"]


@register_context_modifier(template="forms/field.jinja")
def add_form_field(context, request):
    form = ExampleForm()
    context["form_field"] = form["single_line_text"]
