from .base import *
from unipath import Path
import dj_database_url


DATABASES = {}
DATABASES = {
    'default': dj_database_url.config(
        env="WERCKER_POSTGRESQL_URL",
        default="sqlite:///local_db.sqlite"
    )
}

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Allow all host headers
ALLOWED_HOSTS = ['*']

import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = PROJECT_ROOT.child("static")
STATIC_URL = '/static/'

DEBUG = True
PIPELINE_ENABLED = False
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'
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

# MIDDLEWARE_CLASSES += (
#     'django.middleware.gzip.GZipMiddleware',
#     'pipeline.middleware.MinifyHTMLMiddleware',
# )

SECRET_KEY = "testing"

#TODO:
#set secret key as env variable??
#media root??
#cache settings??

# DEFAULT_FILE_STORAGE = 'app.storage.S3PipelineStorage'
# AWS_QUERYSTRING_AUTH = False
# MEDIA_URL = "https://s3-us-west-2.amazonaws.com/greenbook/"

#put the cloudfront distro here
#AWS_S3_CUSTOM_DOMAIN = "foo.cloudfront.net"


#EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
# TEMPLATE_LOADERS = (
#     ('django.template.loaders.cached.Loader', (
#         'django.template.loaders.filesystem.Loader',
#         'django.template.loaders.app_directories.Loader',
#     )),
# )


STRIPE_PUBLIC_KEY = ""
STRIPE_SECRET_KEY = ""

AWS_ACCESS_KEY_ID = ""
AWS_SECRET_ACCESS_KEY = ""
AWS_STORAGE_BUCKET_NAME = ""
