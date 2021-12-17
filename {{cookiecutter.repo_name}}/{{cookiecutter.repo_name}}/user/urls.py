from django.urls import include, path  # NOQA

urlpatterns = [
    path("", include("allauth.urls")),
]
