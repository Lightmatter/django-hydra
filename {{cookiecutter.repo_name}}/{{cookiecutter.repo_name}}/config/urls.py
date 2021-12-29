from django.conf import settings
from django.urls import include, path
from django.utils.decorators import method_decorator
from django.views import defaults as default_views

from allauth.account.views import LoginView
from axes.decorators import axes_dispatch, axes_form_invalid
from django.contrib import admin

from {{cookiecutter.repo_name}}.user.forms import AxesLoginForm

LoginView.dispatch = method_decorator(axes_dispatch)(LoginView.dispatch)
LoginView.form_invalid = method_decorator(axes_form_invalid)(LoginView.form_invalid)

urlpatterns = []

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]

if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar
        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns

urlpatterns += [
    path("users/", include("{{cookiecutter.repo_name}}.user.urls", namespace="user")),
    path("account/login/", LoginView.as_view(form_class=AxesLoginForm), name="account_login"),
    path("account/", include("allauth.urls")),
    path("admin/", admin.site.urls),
    path("", include("{{cookiecutter.repo_name}}.home.urls")),
]

{%- if cookiecutter.use_wagtail == 'y' %}
# This needs to come after static and debug calls
urlpatterns += [
    path("", include("{{ cookiecutter.repo_name }}.wagtailapp.urls")),
]{% endif %}
