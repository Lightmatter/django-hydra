FROM python:3.8 as django
#install python requirements and static compile
ENV DJANGO_SETTINGS_MODULE={{cookiecutter.repo_name}}.{{cookiecutter.repo_name}}.settings.prod
RUN mkdir app
WORKDIR app
COPY Pipfile Pipfile.lock /app/
run pip install pipenv
RUN pipenv install
COPY . /app

RUN APP_VERSION_RELEASE="build" ENVIRONMENT="build" SENTRY_DSN="" REDIS_URL="" DATABASE_URL="" ALLOWED_HOSTS="*" SECRET_KEY="foobar" pipenv run ./manage.py collectstatic --noinput
# cmd goes here if you want to run this on its own

from node:15.5.1 as next
ARG ENVIRONMENT
ARG SENTRY_DSN
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_PROJECT="{{cookiecutter.repo_name}}"
ARG SENTRY_ORG="{{cookiecutter.repo_name}}-health"
ARG APP_VERSION_RELEASE
ARG BUILD_TIME
ARG API_BASE_URL=""
ARG SERVER_BASE_URL="http://127.0.0.1:8000"
ARG AWS_S3_CUSTOM_DOMAIN

RUN mkdir app
WORKDIR app
#install requirements
COPY . /app
RUN yarn
RUN yarn run build
# cmd goes here if you want to run this on its own


from django as release
env APP_VERSION_RELEASE="migrate" ENVIRONMENT="migrate" SENTRY_DSN="" DATABASE_URL="" ALLOWED_HOSTS="*" SECRET_KEY="foobar"
CMD ["pipenv", "run", "/app/manage.py", "migrate", "--noinput"]


from django as dev
RUN python3.8 -m pipenv install --dev
