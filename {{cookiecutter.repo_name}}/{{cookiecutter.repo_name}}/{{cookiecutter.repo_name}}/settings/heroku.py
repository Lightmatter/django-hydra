from urllib.parse import urlparse

import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
from sentry_sdk.integrations.redis import RedisIntegration

from .base import *

SESSION_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = False  # let nginx handle
DATABASES = {}
DATABASES["default"] = env.db()

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")


ALLOWED_HOSTS = [u"0.0.0.0", "127.0.0.1"] + env(  # nosec
    "ALLOWED_HOSTS", default="*"
).split("|")

STATIC_ROOT = root("static")

redis_url = urlparse(env("REDIS_URL", default="redis://localhost:6959"))
CACHES = {
    "default": {
        "BACKEND": "redis_cache.RedisCache",
        "LOCATION": "%s:%s" % (redis_url.hostname, redis_url.port),
        "OPTIONS": {
            "DB": 0,
            "PASSWORD": redis_url.password,
            "PARSER_CLASS": "redis.connection.HiredisParser",
            "PICKLE_VERSION": -1,
        },
    }
}

SESSION_ENGINE = "django.contrib.sessions.backends.cached_db"

MIDDLEWARE += ("django.middleware.gzip.GZipMiddleware",)

SECRET_KEY = env("SECRET_KEY")

# TODO:
# MEDIA_ROOT??

DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
AWS_QUERYSTRING_AUTH = False


INSTALLED_APPS += ("anymail",)
ANYMAIL = {
    "MAILGUN_API_KEY": env("MAILGUN_API_KEY", default=""),
}
EMAIL_BACKEND = "anymail.backends.mailgun.EmailBackend"
# mailgun will refuse to send mail not from a whitelisted domain.
DEFAULT_FROM_EMAIL = "hello@" + env("MAILGUN_DOMAIN", default="")
SERVER_EMAIL = "error@" + env("MAILGUN_DOMAIN", default="")

STRIPE_PUBLIC_KEY = env("STRIPE_PUBLIC_KEY", default="")
STRIPE_SECRET_KEY = env("STRIPE_SECRET_KEY", default="")

AWS_ACCESS_KEY_ID = env("AWS_ACCESS_KEY_ID", default="")
AWS_SECRET_ACCESS_KEY = env("AWS_SECRET_ACCESS_KEY", default="")
AWS_STORAGE_BUCKET_NAME = env("AWS_STORAGE_BUCKET_NAME", default="")
# cloudfront distro
AWS_S3_CUSTOM_DOMAIN = env("AWS_S3_CUSTOM_DOMAIN", default="")


AWS_IS_GZIPPED = True
AWS_S3_REGION_NAME = "us-east-1"

STATIC_URL = "//{}/static/".format(AWS_S3_CUSTOM_DOMAIN)

# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
# GEOS_LIBRARY_PATH = '/app/.heroku/vendor/lib/libgeos_c.so'
# GDAL_LIBRARY_PATH = '/app/.heroku/vendor/lib/libgdal.so'

# SOCIAL_AUTH_FACEBOOK_KEY = env('SOCIAL_AUTH_FACEBOOK_KEY')
# SOCIAL_AUTH_FACEBOOK_SECRET = env('SOCIAL_AUTH_FACEBOOK_SECRET')

sentry_sdk.init(
    dsn=env("SENTRY_DSN"),
    integrations=[DjangoIntegration(), RedisIntegration()],
    # If you wish to associate users to errors (assuming you are using
    # django.contrib.auth) you may enable sending PII data.
    send_default_pii=True,
    environment=env("ENVIRONMENT"),
    release=env("APP_VERSION_RELEASE"),
)
