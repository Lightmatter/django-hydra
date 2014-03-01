from django.conf.urls import patterns, include, url
from .views import RegistrationView

urlpatterns = patterns('',
                       url(r'^register/$',
                           RegistrationView.as_view(),
                           name='registration_register'),
)



###Simple backend doesn't do email confirmation
urlpatterns += patterns('app.views',
    (r'', include('registration.backends.simple.urls')),
)

###default backend does  email confirmation

# urlpatterns = patterns('app.views',
#     (r'', include('registration.backends.default.urls')),
# )
