# pylint: disable-all
import platform
import subprocess

from .local import *  # noqa

# PASSWORDS
# ------------------------------------------------------------------------------
# https://docs.djangoproject.com/en/dev/ref/settings/#password-hashers
PASSWORD_HASHERS = ["django.contrib.auth.hashers.MD5PasswordHasher"]

MIDDLEWARE.remove("debug_toolbar.middleware.DebugToolbarMiddleware")
INSTALLED_APPS.remove("debug_toolbar")

npm = subprocess.run(
    ["npm", "run", "build"],
    shell=platform.system() == "Windows",
)

if npm.returncode != 0:
    print(npm.stderr)
    exit(-1)

TEMPLATE_DEBUG = False
DJANGO_VITE_DEV_MODE = False
