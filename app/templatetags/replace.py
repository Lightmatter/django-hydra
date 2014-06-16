from django import template

register = template.Library()

def replace(value, args):
   frm, to = [arg for arg in args.split(',')]
   return value.replace(frm, to)

register.filter('replace', replace)
