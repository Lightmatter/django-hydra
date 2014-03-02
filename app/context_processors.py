from django.conf import settings as django_settings

def settings(request):
    settings = {
        'SETTINGS': django_settings,
    }

    return settings
