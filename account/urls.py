from django.conf.urls import include, url
from .views import RegistrationView


urlpatterns = [
    url(r'^register/$', RegistrationView.as_view(), name='registration_register'),
]

# Simple backend doesn't do email confirmation
urlpatterns += [
    url(r'', include('registration.backends.simple.urls')),
]
