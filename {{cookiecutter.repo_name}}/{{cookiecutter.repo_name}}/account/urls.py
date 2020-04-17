from django.urls import include, path  # NOQA
from .views import TokenCreateView

urlpatterns = [path("token/login/", TokenCreateView.as_view(), name="login")]
