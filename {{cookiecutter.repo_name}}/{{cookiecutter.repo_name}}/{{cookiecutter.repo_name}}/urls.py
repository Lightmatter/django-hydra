from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from django.views.generic.base import RedirectView
from django.views.static import serve as static_serve

urlpatterns = [
    path(
        r"favicon.ico",
        RedirectView.as_view(url="/static/img/favicon.ico", permanent=True),
    ),
    path(r"account/", include("{{cookiecutter.repo_name}}.account.urls")),
    path(r"admin/", admin.site.urls),
    path("", include("social_django.urls", namespace="social")),
    path(r"", include("{{cookiecutter.repo_name}}.home.urls")),
]

if settings.DEBUG:
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    import debug_toolbar

    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += [
        path(
            r"media/<str:path>.*", static_serve, {"document_root": settings.MEDIA_ROOT}
        ),
        path(r"__debug__/", include(debug_toolbar.urls)),
    ]  # noqa
