# pylint: skip-file
import logging
import sys
import traceback

from django.template import Context, VariableDoesNotExist, defaultfilters
from django.template.base import FilterExpression

from .base import *  # noqa
from .base import env

# GENERAL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

# CACHES
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#caches
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "radio-kaikan",
    }
}


def skip_invalid_tags(record):
    if record.exc_info:
        exc_type, exc_value = record.exc_info[:2]
        if exc_type is VariableDoesNotExist:
            return False

    return True


# Logging
# ------------------------------------------------------------------------------
# Turn on debugging logging
LOGGING["formatters"] = {
    "verbose": {
        "format": "{levelname} {asctime} {module} {message}",
        "style": "{",
    },
    "simple": {
        "format": "{levelname} {message}",
        "style": "{",
    },
}

if "filters" not in LOGGING:
    LOGGING["filters"] = {}

LOGGING["filters"]["skip_invalid_tags"] = {
    "()": "django.utils.log.CallbackFilter",
    "callback": skip_invalid_tags,
}

LOGGING["loggers"]["urllib3"] = {
    "handlers": ["console"],
    "level": "DEBUG",
    "propagate": True,
}

LOGGING["loggers"]["django"] = {
    "handlers": ["console"],
    "level": "DEBUG",
    "propagate": True,
}

LOGGING["handlers"]["console"]["formatter"] = "simple"
LOGGING["handlers"]["console"]["filters"] = ["skip_invalid_tags"]

# EMAIL
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#email-backend
EMAIL_BACKEND = env(
    "DJANGO_EMAIL_BACKEND", default="django.core.mail.backends.console.EmailBackend"
)

# WhiteNoise
# ------------------------------------------------------------------------------
# http://whitenoise.evans.io/en/latest/django.html#using-whitenoise-in-development
INSTALLED_APPS = ["whitenoise.runserver_nostatic"] + INSTALLED_APPS  # noqa F405

# django-debug-toolbar
# ------------------------------------------------------------------------------
# https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#prerequisites
INSTALLED_APPS += ["debug_toolbar"]  # noqa F405
# ensure that DJDT has access to the htmx attrs
MIDDLEWARE.remove("django_htmx.middleware.HtmxMiddleware")

# https://django-debug-toolbar.readthedocs.io/en/latest/installation.html#middleware
MIDDLEWARE = [
    "django_htmx.middleware.HtmxMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
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
LOG_TEMPLATE_INVALIDS = env.bool("LOG_TEMPLATE_INVALIDS", True)


class InvalidVariable(str):
    def __init__(self, *args):
        self._filtered = False

    def __str__(self):
        if self._filtered:
            return ""

        return super(self, str).__str__()

    @staticmethod
    def log(exception, var_name, context):
        msg = "%s: {{ %s }} in %s"
        if isinstance(context, Context):
            template_name = context.template.name
            render_template = context.render_context.template.name
            args = [exception.__class__.__name__, var_name, render_template]

            if render_template != template_name:
                msg += " (origin %s)"
                args.append(template_name)
        else:
            args = [exception.__class__.__name__, var_name, type(context)]

        logging.getLogger("django").warning(msg, *args)

    def __bool__(self):
        """
        Determine if replacement text is appropriate
        given the context around the undefined var.
        returning True will fill in with replacement text
        returning False will leave it empty
        :return: bool
        """
        err_class, exception, trace = sys.exc_info()
        if err_class is not VariableDoesNotExist:
            return False

        var_name, context = exception.params

        for (frame, _frame_id) in traceback.walk_tb(trace):
            former_self = frame.f_locals.get("self", None)
            if isinstance(former_self, FilterExpression):
                var_name = str(former_self.var)
                self._filtered = bool(len(former_self.filters))

        if LOG_TEMPLATE_INVALIDS:
            InvalidVariable.log(exception, var_name, context)

        return not self._filtered


TEMPLATES[0]["OPTIONS"]["string_if_invalid"] = InvalidVariable("BAD TEMPLATE VARIABLE: %s")

TESTING = sys.argv[1:2] == ["test"]
if TESTING:
    MIDDLEWARE.remove("debug_toolbar.middleware.DebugToolbarMiddleware")
    INSTALLED_APPS.remove("debug_toolbar")
    PASSWORD_HASHERS = ("django.contrib.auth.hashers.MD5PasswordHasher",)
    import subprocess

    subprocess.run(["npm", "run", "build"])
    DJANGO_VITE_DEV_MODE = False
    TEMPLATE_DEBUG = False
