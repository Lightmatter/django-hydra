from django.conf import settings as django_settings


def settings(request):
    settings = {"settings": django_settings}

    return settings
