from django.conf.urls import include, url
from django.views.generic.base import TemplateView

from .views import error

urlpatterns = [
    url(r'^error/', error, name='error'),
    url(r'^$', TemplateView.as_view(template_name="index.html"), name="home"),
]

from .signals import * #ensure that the signals are attatched via import
