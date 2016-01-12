from .base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'circle_test',
        'USER': 'ubuntu',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '',
    }
}

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Allow all host headers
ALLOWED_HOSTS = ['*']

STATIC_ROOT = str(PROJECT_ROOT / 'static')
STATIC_URL = '/static/'

DEBUG = True
PIPELINE_ENABLED = False
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'
SECRET_KEY = 'testing'

TEST_RUNNER = 'xmlrunner.extra.djangotestrunner.XMLTestRunner'
TEST_OUTPUT_DIR = get_env_setting('CIRCLE_TEST_REPORTS', default='.')
