from django.conf.urls import url, include
from .views import LoginView, LogoutView, RegistrationView, PasswordResetView, PasswordResetConfirmView


authurls = [
    url(r'^login/', LoginView.as_view(), name='user-login'),
    url(r'^logout/', LogoutView.as_view(), name='user-logout'),
    url(r'^register/user/', RegistrationView.as_view(), name='user-register'),
    url(r'^password/reset/$', PasswordResetView.as_view(), name='password-reset'),
    url(r'^password/reset/confirm/$', PasswordResetConfirmView.as_view(), name='password-confirm'),
]
