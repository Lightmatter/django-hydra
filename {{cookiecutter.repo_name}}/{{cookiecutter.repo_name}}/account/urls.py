from django.urls import include, path  # NOQA

from .views import TokenCreateView, UserCreateView

urlpatterns = [
    path("token/login/", TokenCreateView.as_view(), name="login"),
    path("register/", UserCreateView.as_view(), name="register"),
]
