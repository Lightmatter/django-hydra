# Create your views here.
from django.http import HttpResponse

from annoying.decorators import render_to

@render_to('index.html')
def index(request):
    return {}
