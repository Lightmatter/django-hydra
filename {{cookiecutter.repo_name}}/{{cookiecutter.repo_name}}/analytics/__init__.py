{% if cookiecutter.use_analytics == 'y' -%}
default_app_config = "{{cookiecutter.repo_name}}.analytics.apps.AnalyticsapiConfig"

{%- endif %}
