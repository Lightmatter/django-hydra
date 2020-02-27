from .base import *

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "circle_test",
        "USER": "ubuntu",
        "PASSWORD": "",
        "HOST": "localhost",
        "PORT": "",
    }
}

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# Allow all host headers
ALLOWED_HOSTS = ["*"]

STATIC_ROOT = root("static")
STATIC_URL = "/static/"
MEDIA_ROOT = root("media")
MEDIA_URL = "/media/"

DEBUG = True
SECRET_KEY = "testing"

TEST_RUNNER = "xmlrunner.extra.djangotestrunner.XMLTestRunner"
TEST_OUTPUT_DIR = env("CIRCLE_TEST_REPORTS", default=".")

TEMPLATES[0]["OPTIONS"]["debug"] = True
TEMPLATES[1]["OPTIONS"]["debug"] = True
