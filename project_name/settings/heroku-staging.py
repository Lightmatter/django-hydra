from .base import *
from unipath import Path
import dj_database_url
DATABASES = {}
DATABASES['default'] = dj_database_url.config()

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Allow all host headers
ALLOWED_HOSTS = ['*']

import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = PROJECT_ROOT.child("static")
STATIC_URL = '/static/'

DEBUG = True
PIPELINE_ENABLED = True

# CACHES = {
#     'default': {
#         'BACKEND': 'redis_cache.RedisCache',
#         'LOCATION': env.get('DOTCLOUD_CACHE_REDIS_HOST','') + ":" + env.get('DOTCLOUD_CACHE_REDIS_PORT', ''),
#         'OPTIONS': {
#             'DB': 1,
#             'PASSWORD': env.get('DOTCLOUD_CACHE_REDIS_PASSWORD', ''),
#             'PARSER_CLASS': 'redis.connection.HiredisParser',
#             'PICKLE_VERSION': 2,
#         },
#     },
# }


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

SECRET_KEY =  os.environ.get('DJANGO_SECRET_KEY','boo')
SECRET_KEY = "hwk4xwq%-i4_$=i=(k7dorw!j9p@bkywwqtu5y729xbxs&0h6+"

#TODO:
#set secret key as env variable??
#media root??
#cache settings??


DEFAULT_FILE_STORAGE = 'storages.backends.s3boto.S3BotoStorage'
MEDIA_URL = "https://s3-us-west-2.amazonaws.com/{{project_name}}/"

EMAIL_BACKEND = 'django_mandrill.mail.backends.mandrillbackend.EmailBackend'
MANDRILL_API_KEY = get_env_setting('MANDRILL_API_KEY')

#EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
