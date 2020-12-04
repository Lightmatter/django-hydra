FROM bbeecher/lightmatter-base-image:v0.2 AS os

RUN apt -y update
RUN apt -y install libnginx-mod-http-perl
ADD image/ /app_build/

#add nginx conf files
RUN cp /app_build/config/webapp.conf /etc/nginx/sites-enabled/webapp.conf
RUN cp /app_build/config/nginx.conf /etc/nginx/nginx.conf



from os as django
#add django run files files
ADD image/ /app_build/
RUN mkdir /etc/service/django
RUN cp /app_build/runit/django /etc/service/django/run


#install python requirements and static compile
ENV DJANGO_SETTINGS_MODULE={{cookiecutter.repo_name}}.{{cookiecutter.repo_name}}.settings.heroku
RUN mkdir app
WORKDIR app
COPY requirements.txt /app
RUN python3.8 -m pip install -r requirements.txt --no-cache-dir
COPY . /app

RUN APP_VERSION_RELEASE="build" ENVIRONMENT="build" SENTRY_DSN="" REDIS_URL="" DATABASE_URL="" ALLOWED_HOSTS="*" SECRET_KEY="foobar" python3.8 ./manage.py collectstatic --noinput
# cmd goes here if you want to run this on its own

from os as next
ARG ENVIRONMENT
ARG SENTRY_DSN
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_PROJECT="{{cookiecutter.repo_name}}"
ARG SENTRY_ORG="lightmatter"
ARG APP_VERSION_RELEASE
ARG BUILD_TIME
ARG API_BASE_URL=""
ARG SERVER_BASE_URL="http://127.0.0.1:8000"
ARG AWS_S3_CUSTOM_DOMAIN

#add nextjs runit files
ADD image/ /app_build/
RUN mkdir /etc/service/nextjs && cp /app_build/runit/nextjs /etc/service/nextjs/run

RUN mkdir app
WORKDIR app
#install requirements
COPY package.json  yarn.lock /app/
RUN yarn install --production

COPY . /app
RUN yarn run build
# cmd goes here if you want to run this on its own


from django as app
ARG BUILD_TIME
ARG APP_VERSION_RELEASE
ENV APP_VERSION_RELEASE=$APP_VERSION_RELEASE
ENV BUILD_TIME=$BUILD_TIME
COPY --from=next /app/node_modules /app/node_modules
COPY --from=next /app/.next /app/.next
COPY --from=next /etc/service/nextjs /etc/service/nextjs
CMD ["/sbin/my_init", "--skip-startup-files"]

from django as release
env APP_VERSION_RELEASE="migrate" ENVIRONMENT="migrate" SENTRY_DSN="" DATABASE_URL="" ALLOWED_HOSTS="*" SECRET_KEY="foobar"
CMD ["/usr/bin/python3.8", "/app/manage.py", "migrate", "--noinput"]


from app as dev
RUN python3.8 -m pip install -r requirements-dev.txt --no-cache-dir
