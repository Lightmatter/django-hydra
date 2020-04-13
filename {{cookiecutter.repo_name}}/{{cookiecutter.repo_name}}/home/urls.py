from django.urls import path
from django.views.generic.base import TemplateView

from .views import error

urlpatterns = [
    path(r"error/", error, name="error"),
    path(r"", TemplateView.as_view(template_name="index.html"), name="home"),
]
