FROM bbeecher/lightmatter-base-image:v0.2 AS os

ADD image/ /app_build/

#add runit conf files for front and back
RUN mkdir /etc/service/django && \
    mkdir /etc/service/nextjs && \
    cp /app_build/runit/django /etc/service/django/run && \
    cp /app_build/runit/nextjs /etc/service/nextjs/run

#add nginx conf files for front and back
RUN cp /app_build/config/webapp.conf /etc/nginx/sites-enabled/webapp.conf


from os as app
RUN mkdir app
WORKDIR app
COPY  requirements.txt /app
RUN python3.8 -m pip install -r requirements.txt --no-cache-dir

COPY package.json  yarn.lock /app/
RUN yarn install --production && yarn cache clean


ARG DATABASE_URL
ARG ALLOWED_HOSTS="*"
ARG SECRET_KEY="foobar"
ENV DJANGO_SETTINGS_MODULE={{cookiecutter.repo_name}}.{{cookiecutter.repo_name}}.settings.heroku
COPY . /app

RUN python3.8 ./manage.py collectstatic --noinput
RUN yarn run build

CMD ["/sbin/my_init", "--skip-startup-files"]


from app as dev
RUN python3.8 -m pip install -r requirements-dev.txt --no-cache-dir
