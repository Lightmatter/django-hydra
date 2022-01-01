FROM python:3.10.1-slim as base

# Setup env
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONFAULTHANDLER 1
ENV PYTHONUNBUFFERED=1
ENV PYTHONHASHSEED=random
ENV DJANGO_SETTINGS_MODULE={{ cookiecutter.repo_name }}.config.settings.prod


FROM node:lts-alpine AS js-deps
# Install application into container
COPY . .
RUN npm install
RUN npm run build

FROM base AS python-deps
# Install poetry and compilation dependencies
RUN pip install poetry
# Install python dependencies in /.venv
COPY pyproject.toml .
COPY poetry.lock .
ENV POETRY_VIRTUALENVS_IN_PROJECT true
run poetry install --no-dev --no-interaction


FROM base AS runtime

# Copy virtual env from python-deps stage
COPY --from=python-deps /.venv /.venv
ENV PATH="/.venv/bin:$PATH"

# Create and switch to a new user
WORKDIR app

# Install application into container
COPY . .
COPY --from=js-deps /{{cookiecutter.repo_name}}/static ./{{cookiecutter.repo_name}}/static

RUN DJANGO_SECRET_KEY="!!! CHANGE ME !!!" DJANGO_ALLOWED_HOSTS="*" APP_VERSION_RELEASE="build" ENVIRONMENT="build" SENTRY_DSN="" REDIS_URL="" DATABASE_URL="" ALLOWED_HOSTS="*" SECRET_KEY="foobar" python ./manage.py collectstatic --noinput
CMD gunicorn {{cookiecutter.repo_name}}.config.asgi:application --bind 0.0.0.0:8080  -k uvicorn.workers.UvicornWorker --access-logfile - --preload
