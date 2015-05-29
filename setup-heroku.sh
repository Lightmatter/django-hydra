#!/bin/bash
ENV_NAME="{{ project_name }}"
ENV_OPSTS="--no-site-packages --distribute"


unset PYTHONDONTWRITEBYTECODE
source `which virtualenvwrapper.sh`


workon $ENV_NAME
heroku create $ENV_NAME-prod --remote prod --buildpack https://github.com/ddollar/heroku-buildpack-multi.git

heroku addons:create mandrill:starter --app $ENV_NAME-prod

heroku addons:create newrelic --app $ENV_NAME-prod

heroku addons:create redistogo --app $ENV_NAME-prod


heroku config:set AWS_SECRET_ACCESS_KEY="" --app $ENV_NAME-prod
heroku config:set AWS_ACCESS_KEY_ID="" --app $ENV_NAME-prod
heroku config:set AWS_STORAGE_BUCKET_NAME=$ENV_NAME-prod --app $ENV_NAME-prod
heroku config:set STRIPE_PUBLIC_KEY="" --app $ENV_NAME-prod
heroku config:set STRIPE_SECRET_KEY="" --app $ENV_NAME-prod
heroku config:set SECRET_KEY=`python -c 'import random; print("".join([random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)") for i in range(50)]))'` --app $ENV_NAME-prod
heroku config:set DJANGO_SETTINGS_MODULE=$ENV_NAME.settings.heroku --app $ENV_NAME-prod

git push prod master
heroku run python manage.py migrate --app $ENV_NAME-prod

heroku fork --to $ENV_NAME-staging --from $ENV_NAME-prod
heroku fork --to $ENV_NAME-dev --from $ENV_NAME-prod

heroku config:set SECRET_KEY=`python -c 'import random; print("".join([random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)") for i in range(50)]))'` --app $ENV_NAME-dev
heroku config:set SECRET_KEY=`python -c 'import random; print("".join([random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)") for i in range(50)]))'` --app $ENV_NAME-staging

heroku config:set DJANGO_SETTINGS_MODULE=$ENV_NAME.settings.heroku-dev --app $ENV_NAME-dev
heroku config:set DJANGO_SETTINGS_MODULE=$ENV_NAME.settings.heroku-staging --app $ENV_NAME-staging

heroku config:set AWS_STORAGE_BUCKET_NAME=$ENV_NAME-dev --app $ENV_NAME-dev
heroku config:set AWS_STORAGE_BUCKET_NAME=$ENV_NAME-staging --app $ENV_NAME-staging

echo "python manage.py migrate" >> bin/post_compile

heroku git:remote -r dev -a $ENV_NAME-dev
heroku git:remote -r staging -a $ENV_NAME-staging
