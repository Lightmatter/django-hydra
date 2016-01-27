#!/usr/bin/env python
import os
import sys

from django.core.exceptions import ImproperlyConfigured


if __name__ == "__main__":
    try:
        os.environ["DJANGO_SETTINGS_MODULE"]
    except KeyError:
        raise ImproperlyConfigured("You must set your DJANGO_SETTINGS_MODULE - try working {{ cookiecutter.repo_name }}")
    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
