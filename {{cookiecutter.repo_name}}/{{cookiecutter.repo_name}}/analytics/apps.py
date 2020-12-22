import os

from django.apps import AppConfig
from django.conf import settings

import analytics

class AnalyticsapiConfig(AppConfig):
  name = '{{cookiecutter.repo_name}}.analytics'

  def ready(self):
    analytics.write_key = settings.SEGMENT_KEY