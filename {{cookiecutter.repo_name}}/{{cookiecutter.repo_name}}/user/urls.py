from django.urls import path

from .views import WelcomeView, login, signup, user_redirect_view

app_name = "user"
urlpatterns = [
    path("login/", view=login, name="account_login"),
    path("signup/", view=signup, name="account_signup"),
    path("welcome/", view=WelcomeView.as_view(), name="account_welcome"),
    path("~redirect/", view=user_redirect_view, name="redirect"),
]
