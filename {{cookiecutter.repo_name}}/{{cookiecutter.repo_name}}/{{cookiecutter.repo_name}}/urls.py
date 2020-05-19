from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from django.views.generic.base import RedirectView

from django.contrib import admin

urlpatterns = [
    path(
        "favicon.ico",
        RedirectView.as_view(url="/static/img/favicon.ico", permanent=True),
    ),
    path("account/", include("{{cookiecutter.repo_name}}.account.urls")),
    path("admin/", admin.site.urls),
    path("", include("social_django.urls", namespace="social")),
    path("", include("{{cookiecutter.repo_name}}.home.urls")),
    {%- if cookiecutter.use_wagtail == 'y' -%}
    path("", include("{{ cookiecutter.repo_name }}.wagtailapp.urls")),
    {%- endif %}
]

if settings.DEBUG:
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    import debug_toolbar

    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += [path(r"__debug__/", include(debug_toolbar.urls))]
