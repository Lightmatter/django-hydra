#!/usr/bin/env python
import os
import sys

from django.core.exceptions import ImproperlyConfigured

if __name__ == "__main__":
    if "DJANGO_SETTINGS_MODULE" in os.environ or any(
        "--settings" in arg for arg in sys.argv
    ):
        # pony mode is dumb and wants to use relative paths
        for idx, arg in enumerate(sys.argv):
            if "--settings" in arg:
                sys.argv[idx] = arg.replace("=.", "=")
        from django.core.management import execute_from_command_line

        execute_from_command_line(sys.argv)
    else:
        raise ImproperlyConfigured(
            "You must set your DJANGO_SETTINGS_MODULE - try working {{ cookiecutter.repo_name }}"
        )
