FROM phusion/passenger-customizable:1.0.9 AS os
RUN apt-get remove -y passenger libnginx-mod-http-passenger
RUN rm /etc/nginx/modules-enabled/50-mod-http-passenger.conf && rm /etc/nginx/conf.d/mod-http-passenger.conf && rm /etc/apt/sources.list.d/passenger.list
#upgrade the os
# RUN apt-get update && apt-get upgrade -y -o Dpkg::Options::="--force-confold"


ADD image/ /lm_build


# Set correct environment variables.
ENV HOME /root

# Use baseimage-docker's init process.
CMD ["/sbin/my_init"]

# If you're using the 'customizable' variant, you need to explicitly opt-in
# for features.
#
# N.B. these images are based on https://github.com/phusion/baseimage-docker,
# so anything it provides is also automatically on board in the images below
# (e.g. older versions of Ruby, Node, Python).
#

#   Python support.
RUN /lm_build/python.sh

#   Node.js and Meteor standalone support.
RUN /pd_build/nodejs.sh
# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN npm i -g yarn

#add runit conf files for front and back
RUN mkdir /etc/service/django && mkdir /etc/service/nextjs
COPY image/runit/django /etc/service/django/run
COPY image/runit/nextjs /etc/service/nextjs/run


#TODO: Everything above here can be factored out and will rarely change
#add nginx conf files for front and back
RUN rm /etc/nginx/sites-enabled/default
RUN cp /lm_build/config/webapp.conf /etc/nginx/sites-enabled/webapp.conf

#turn nginx on
RUN rm -f /etc/service/nginx/down

RUN mkdir /home/app/webapp


WORKDIR /home/app/webapp

from os as app

COPY  requirements.txt requirements-dev.txt /home/app/webapp/
RUN python3.8 -m pip install -r requirements.txt --no-cache-dir


ARG DATABASE_URL
ARG ALLOWED_HOSTS="*"
ARG SECRET_KEY="foobar"
ENV DJANGO_SETTINGS_MODULE={{cookiecutter.repo_name}}.{{cookiecutter.repo_name}}.settings.heroku

COPY package.json  yarn.lock /home/app/webapp/
RUN yarn install --production && yarn cache clean

COPY --chown=app:app . /home/app/webapp
RUN python3.8 ./manage.py collectstatic --noinput
RUN yarn run build


from app as dev
COPY --from=app /home/app/webapp /home/app/webapp
RUN python3.8 -m pip install -r requirements-dev.txt --no-cache-dir
