import os
from urllib.parse import urlparse

import dj_database_url

from .base import *

SSLIFY_DISABLE = False
DATABASES = {}
DATABASES['default'] = dj_database_url.config()

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

ALLOWED_HOSTS = env('ALLOWED_HOSTS').split('|')

STATIC_ROOT = str(PROJECT_ROOT / 'static')
redis_url = env.url('REDISTOGO_URL', default='redis://localhost:6959')
CACHES = {
    'default': {
        'BACKEND': 'redis_cache.RedisCache',
        'LOCATION': '%s:%s' % (redis_url.hostname, redis_url.port),
        'OPTIONS': {
            'DB': 0,
            'PASSWORD': redis_url.password,
            'PARSER_CLASS': 'redis.connection.HiredisParser',
            'PICKLE_VERSION': 2,
        },
    },
}

SESSION_ENGINE = 'django.contrib.sessions.backends.cached_db'

MIDDLEWARE_CLASSES += (
    'django.middleware.gzip.GZipMiddleware',
    'pipeline.middleware.MinifyHTMLMiddleware',
)

SECRET_KEY = env('SECRET_KEY')

# TODO:
# MEDIA_ROOT??

DEFAULT_FILE_STORAGE = 'storages.backends.s3boto.S3BotoStorage'
AWS_QUERYSTRING_AUTH = False


# put the cloudfront distro here
# AWS_S3_CUSTOM_DOMAIN = 'foo.cloudfront.net'


EMAIL_BACKEND = 'sgbackend.SendGridBackend'
SENDGRID_USER = env('SENDGRID_USERNAME')
SENDGRID_PASSWORD = env('SENDGRID_PASSWORD')

STRIPE_PUBLIC_KEY = env('STRIPE_PUBLIC_KEY', default='')
STRIPE_SECRET_KEY = env('STRIPE_SECRET_KEY', default='')

AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID', default='')
AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY', default='')
AWS_STORAGE_BUCKET_NAME = env('AWS_STORAGE_BUCKET_NAME', default='')

# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
TEMPLATES[0]['OPTIONS']['loaders'] = (
    ('django.template.loaders.cached.Loader', [
        'django.template.loaders.filesystem.Loader',
        'django.template.loaders.app_directories.Loader',
    ]),
)

# GEOS_LIBRARY_PATH = '/app/.heroku/vendor/lib/libgeos_c.so'
# GDAL_LIBRARY_PATH = '/app/.heroku/vendor/lib/libgdal.so'

# SOCIAL_AUTH_FACEBOOK_KEY = get_env_setting('SOCIAL_AUTH_FACEBOOK_KEY')
# SOCIAL_AUTH_FACEBOOK_SECRET = get_env_setting('SOCIAL_AUTH_FACEBOOK_SECRET')
