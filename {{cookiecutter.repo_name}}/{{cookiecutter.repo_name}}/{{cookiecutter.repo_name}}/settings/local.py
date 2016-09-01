from .base import *
# if you want to test with debug off
env.read_env(str(PROJECT_ROOT.parent / ".env"),
             SECRET_KEY="changeme",
)

ALLOWED_HOSTS = [u'127.0.0.1', 'localhost']
DEBUG = True


DATABASES = {
    'default': env.db()
}

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': 'unique-snowflake'
    }
}

MEDIA_ROOT = str(PROJECT_ROOT / 'media')
MEDIA_URL = '/media/'

STATIC_ROOT = str(PROJECT_ROOT / 'static')


INSTALLED_APPS += (
    'debug_toolbar',
    'template_debug',
)

MIDDLEWARE_CLASSES += (
    'debug_toolbar.middleware.DebugToolbarMiddleware',
)

DEBUG_TOOLBAR_CONFIG = {
    'INTERCEPT_REDIRECTS': False,
}

INTERNAL_IPS = ('127.0.0.1',)

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'


class InvalidVariable(str):
    def __bool__(self):
        return False

TEMPLATES[0]['OPTIONS']['string_if_invalid'] = InvalidVariable('BAD TEMPLATE VARIABLE: %s')


SECRET_KEY = env('SECRET_KEY')
