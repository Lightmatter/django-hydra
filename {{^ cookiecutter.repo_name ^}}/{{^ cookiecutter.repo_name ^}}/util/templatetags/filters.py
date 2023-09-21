import json

from django import template as template_lib

# The below imports should be removed when Django 4.1 releases
from django.utils.html import _json_script_escapes, format_html
from django.utils.safestring import mark_safe

register = template_lib.Library()


# BACKPORT: Remove once Django 4.1 releases
@register.filter(is_safe=True)
def json_script_noid(value, element_id=None):
    """
    Escape all the HTML/XML special characters with their unicode escapes, so
    value is safe to be output anywhere except for inside a tag attribute. Wrap
    the escaped JSON in a script tag.
    """
    from django.core.serializers.json import DjangoJSONEncoder

    json_str = json.dumps(value, cls=DjangoJSONEncoder).translate(_json_script_escapes)
    if element_id:
        template = '<script id="{}" type="application/json">{}</script>'
        args = (element_id, mark_safe(json_str))  # noqa: S308 S703
    else:
        template = '<script type="application/json">{}</script>'
        args = (mark_safe(json_str),)  # noqa: 308
    return format_html(template, *args)
