"""
ASGI config for asgi project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application

# fmt: off
os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "{{cookiecutter.repo_name}}.{{cookiecutter.repo_name}}.settings.heroku",
)
# fmt: on

application = get_asgi_application()
