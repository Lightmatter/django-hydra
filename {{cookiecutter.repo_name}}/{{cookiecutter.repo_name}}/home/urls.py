from django.urls import path
from django.views.generic.base import TemplateView

from .views import current_time, error, test_message_redirect, test_message_refresh

urlpatterns = [
    path(r"current-time/", current_time, name="current_time"),
    path(r"test-refresh/", test_message_refresh, name="test_refresh"),
    path(r"test-redirect/", test_message_redirect, name="test_redirect"),
    path(
        "random-chart/",
        TemplateView.as_view(template_name="samples/random_chart.jinja"),
        name="random_chart",
    ),
    path(r"error/", error, name="error"),
    path(r"", TemplateView.as_view(template_name="index.jinja"), name="home"),
]
