# pylint: skip-file
from ..jinja2 import options
from .base import *  # noqa
from .base import env

# GENERAL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = ["localhost", "127.0.0.1", ".ngrok.io"]

# CACHES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#caches
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "radio-kaikan",
    }
}

# EMAIL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#email-backend
EMAIL_BACKEND = env(
    "DJANGO_EMAIL_BACKEND", default="django.core.mail.backends.console.EmailBackend"
)

# WhiteNoise
# ------------------------------------------------------------------------------
# http://whitenoise.evans.io/en/latest/django.html#using-whitenoise-in-development
INSTALLED_APPS.insert(0, "whitenoise.runserver_nostatic")

# django-debug-toolbar
# ------------------------------------------------------------------------------
# https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#prerequisites
INSTALLED_APPS += [
    "debug_toolbar",
    "silk",
]  # noqa F405
# ensure that DJDT has access to the htmx attrs
MIDDLEWARE.remove("django_htmx.middleware.HtmxMiddleware")

# CORS and CSP headers don't work unless they're before
# other middleware that modify the response.
MIDDLEWARE.remove("corsheaders.middleware.CorsMiddleware")
MIDDLEWARE.remove("csp.middleware.CSPMiddleware")

# https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#middleware
MIDDLEWARE = [
    "csp.middleware.CSPMiddleware",
    "django_htmx.middleware.HtmxMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "silk.middleware.SilkyMiddleware",
] + MIDDLEWARE  # noqa F405
# https://django-debug-toolbar.readthedocs.io/en/latest/configuration.html#debug-toolbar-config

DEBUG_TOOLBAR_PANELS = [
    "debug_toolbar.panels.history.HistoryPanel",
    "debug_toolbar.panels.versions.VersionsPanel",
    "debug_toolbar.panels.timer.TimerPanel",
    "debug_toolbar.panels.settings.SettingsPanel",
    "debug_toolbar.panels.headers.HeadersPanel",
    "debug_toolbar.panels.request.RequestPanel",
    "debug_toolbar.panels.sql.SQLPanel",
    "debug_toolbar.panels.staticfiles.StaticFilesPanel",
    "debug_toolbar.panels.templates.TemplatesPanel",
    "debug_toolbar.panels.cache.CachePanel",
    "debug_toolbar.panels.signals.SignalsPanel",
    "debug_toolbar.panels.logging.LoggingPanel",
    "debug_toolbar.panels.redirects.RedirectsPanel",
    "debug_toolbar.panels.profiling.ProfilingPanel",
    "cachalot.panels.CachalotPanel",
]


DEBUG_TOOLBAR_CONFIG = {
    "DISABLE_PANELS": [
        "debug_toolbar.panels.redirects.RedirectsPanel",
    ],
    "SHOW_TEMPLATE_CONTEXT": True,
    "RENDER_PANELS": False,
}
# https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#internal-ips
INTERNAL_IPS = ["127.0.0.1", "10.0.2.2"]

SILKY_PYTHON_PROFILER = True
SILKY_AUTHENTICATION = False  # User must login
SILKY_AUTHORISATION = False  # User must have permissions ('is_staff' by default).
SILKY_INTERCEPT_PERCENT = 100
SILKY_MAX_REQUEST_BODY_SIZE = 1024  # If request body>1kb, don't log
SILKY_MAX_RESPONSE_BODY_SIZE = 1024  # If response body>1kb, don't log
SILKY_META = True  # Record how much time silky is adding to each request

CACHALOT_UNCACHABLE_TABLES = frozenset(
    (
        "django_migrations",
        "silk_response",
        "silk_sqlquery",
        "silk_profile",
        "silk_request",
    )
)

CSP_DEFAULT_SRC = [
    "'self'",
    f"localhost:{DJANGO_VITE_DEV_SERVER_PORT}",
    f"ws://localhost:{DJANGO_VITE_DEV_SERVER_PORT}",
]
CSP_SCRIPT_SRC += [f"localhost:{DJANGO_VITE_DEV_SERVER_PORT}", "cdn.jsdelivr.net"]
CSP_STYLE_SRC = ["'self'", "'unsafe-inline'", f"localhost:{DJANGO_VITE_DEV_SERVER_PORT}"]

# Local development template caching fix
# Issue reference:
# https://github.com/pallets/jinja/issues/253#issuecomment-1052871750
options["cache_size"] = 0 if DEBUG else 400

TEMPLATES[0]["OPTIONS"] = options

# see: https://code.djangoproject.com/ticket/33497
# see: https://github.com/Lightmatter/htn/pull/77
# Ideally this should be zero in all setups, but there have been reports from other projects
# that that cuases rendering issues
#
# Bandaid fix until the django project puts in an offical patch
# Unclear at this time why prod + dev hosts do not experience any issues with this
DATABASES["default"]["CONN_MAX_AGE"] = 0  # noqa F405
