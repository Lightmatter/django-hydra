FROM bbeecher/lightmatter-base-image:v0.2 AS os

ADD image/ /app_build/

#add runit conf files for front and back
RUN mkdir /etc/service/django && \
    mkdir /etc/service/nextjs && \
    cp /app_build/runit/django /etc/service/django/run && \
    cp /app_build/runit/nextjs /etc/service/nextjs/run

#add nginx conf files for front and back
RUN cp /app_build/config/webapp.conf /etc/nginx/sites-enabled/webapp.conf


from os as web
RUN mkdir app
WORKDIR app
COPY  requirements.txt /app
RUN python3.8 -m pip install -r requirements.txt --no-cache-dir

COPY package.json  yarn.lock /app/
RUN yarn install --production && yarn cache clean

ARG ENVIRONMENT
ARG SENTRY_DSN
arg SENTRY_AUTH_TOKEN
arg SENTRY_PROJECT="{{cookiecutter.repo_name}}"
ARG SENTRY_ORG="lightmatter"
ARG APP_VERSION_RELEASE
ARG BUILD_TIME
ARG API_BASE_URL=""
ARG SERVER_BASE_URL="http://127.0.0.1:8000"

ENV DJANGO_SETTINGS_MODULE={{cookiecutter.repo_name}}.{{cookiecutter.repo_name}}.settings.heroku
ENV APP_VERSION_RELEASE=$APP_VERSION_RELEASE
COPY . /app

RUN DATABASE_URL="" ALLOWED_HOSTS="*" SECRET_KEY="foobar" python3.8 ./manage.py collectstatic --noinput
RUN yarn run build

CMD ["/sbin/my_init", "--skip-startup-files"]


from web as dev
RUN python3.8 -m pip install -r requirements-dev.txt --no-cache-dir

from web as release
CMD ["/usr/bin/python3.8", "/app/manage.py", "migrate", "--noinput"]
