from django import forms
from pattern_library import register_context_modifier


class ExampleForm(forms.Form):
    single_line_text = forms.CharField(max_length=255, help_text="Help text hhere")
    checkbox = forms.BooleanField(
        help_text="Check for yes, uncheck for no", label="Check Box"
    )


@register_context_modifier
def add_common_forms(context, request):
    context["form"] = ExampleForm()


@register_context_modifier
def add_field(context, request):
    form = ExampleForm()
    context["field"] = form["single_line_text"]


@register_context_modifier(template="forms/checkbox.jinja")
def add_checkbox(context, request):
    form = ExampleForm()
    context["checkfield"] = form["checkbox"]


@register_context_modifier(template="forms/field.jinja")
def add_form_field(context, request):
    form = ExampleForm()
    context["form_field"] = form["single_line_text"]
