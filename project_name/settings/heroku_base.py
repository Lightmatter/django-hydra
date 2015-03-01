import os

try:
    from urllib.parse import urlparse
except ImportError:
    from urlparse import urlparse


import dj_database_url

from .base import *

DATABASES = {}
DATABASES['default'] = dj_database_url.config()

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Allow all host headers
ALLOWED_HOSTS = ['*']


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = PROJECT_ROOT.child("static")
STATIC_URL = '/static/'

redis_url = urlparse(os.environ.get('REDISTOGO_URL', 'redis://localhost:6959'))
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

SESSION_ENGINE = "django.contrib.sessions.backends.cached_db"

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/var/www/example.com/media/"
#MEDIA_ROOT = "/home/dotcloud/data/media/"

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/var/www/example.com/static/"

MIDDLEWARE_CLASSES += (
    'django.middleware.gzip.GZipMiddleware',
    'pipeline.middleware.MinifyHTMLMiddleware',
)

SECRET_KEY = get_env_setting('SECRET_KEY')

#TODO:
#media root??

DEFAULT_FILE_STORAGE = 'app.storage.S3PipelineStorage'
AWS_QUERYSTRING_AUTH = False


#put the cloudfront distro here
#AWS_S3_CUSTOM_DOMAIN = "foo.cloudfront.net"


EMAIL_BACKEND = "djrill.mail.backends.djrill.DjrillBackend"
MANDRILL_API_KEY = get_env_setting('MANDRILL_APIKEY')

STRIPE_PUBLIC_KEY = get_env_setting('STRIPE_PUBLIC_KEY')
STRIPE_SECRET_KEY = get_env_setting('STRIPE_SECRET_KEY')

AWS_ACCESS_KEY_ID = get_env_setting('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = get_env_setting('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = get_env_setting('AWS_STORAGE_BUCKET_NAME')



#EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
TEMPLATE_LOADERS = (
    ('django.template.loaders.cached.Loader', (
        'django.template.loaders.filesystem.Loader',
        'django.template.loaders.app_directories.Loader',
    )),
)


# SOCIAL_AUTH_FACEBOOK_KEY = get_env_setting('SOCIAL_AUTH_FACEBOOK_KEY')
# SOCIAL_AUTH_FACEBOOK_SECRET = get_env_setting('SOCIAL_AUTH_FACEBOOK_SECRET')
