from django.template import Library

register = Library()


@register.filter(name="range")
def range(value):
    """
    Filter - returns a list containing range made from given value
    """
    return range(value)
