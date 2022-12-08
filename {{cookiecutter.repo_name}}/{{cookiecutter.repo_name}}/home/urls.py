from django.urls import path
from django.views.generic.base import TemplateView

from .views import current_time, error, test_message_redirect, test_message_refresh

urlpatterns = [
    path("current-time/", current_time, name="current_time"),
    path("test-refresh/", test_message_refresh, name="test_refresh"),
    path("test-redirect/", test_message_redirect, name="test_redirect"),
    path(
        "random-chart/",
        TemplateView.as_view(template_name="samples/random_chart.jinja"),
        name="random_chart",
    ),
    path("error/", error, name="error"),
    path("", TemplateView.as_view(template_name="index.jinja"), name="home"),
]
