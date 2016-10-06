from django.conf.urls import url
from django.views.generic.base import TemplateView

from .views import ExampleFormView, error

urlpatterns = [
    url(r'^error/', error, name='error'),
    url(r'^$', TemplateView.as_view(template_name="index.html"), name="home"),
    url(r'^form/', ExampleFormView.as_view(), name="Example Form"),
]
