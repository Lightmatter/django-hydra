#!/bin/bash
PROJECT_NAME="{{ cookiecutter.repo_name }}"

for env in dev staging prod; do
    APP_NAME="${PROJECT_NAME}-${env}"

    heroku create $APP_NAME
    heroku buildpacks:add https://github.com/cyberdelia/heroku-geo-buildpack.git#1.4 -a $APP_NAME
    heroku buildpacks:add heroku/nodejs -a $APP_NAME
    heroku buildpacks:add heroku/python -a $APP_NAME

    heroku addons:create sendgrid --app $APP_NAME
    heroku addons:create sentry --app $APP_NAME
    heroku addons:create heroku-redis:hobby-dev --app $APP_NAME
    heroku addons:add heroku-postgresql --app $APP_NAME

    heroku config:set BUILD_WITH_GEO_LIBRARIES=1 --app $APP_NAME
    heroku config:set ALLOWED_HOSTS="*" --app $APP_NAME
    heroku config:set PYTHONHASHSEED=random --app $APP_NAME
    heroku config:set AWS_SECRET_ACCESS_KEY="" --app $APP_NAME
    heroku config:set AWS_ACCESS_KEY_ID="" --app $APP_NAME
    heroku config:set AWS_STORAGE_BUCKET_NAME=$APP_NAME --app $APP_NAME
    heroku config:set STRIPE_PUBLIC_KEY="" --app $APP_NAME
    heroku config:set STRIPE_SECRET_KEY="" --app $APP_NAME
    heroku config:set SENDGRID_API_KEY="" --app $APP_NAME
    heroku config:set SECRET_KEY=`python -c 'import random; print("".join([random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)") for i in range(50)]))'` --app $APP_NAME
    heroku config:set DJANGO_SETTINGS_MODULE=$PROJECT_NAME.$PROJECT_NAME.settings.heroku --app $APP_NAME
    heroku config:set ENVIRONMENT="$env" --app $APP_NAME
    heroku stack:set container --app $APP_NAME

    git remote add $env git@heroku.com:$APP_NAME.git
    git push $env master
    heroku run python manage.py migrate --app $APP_NAME

    heroku dyno:type hobby --app $APP_NAME
    heroku apps:transfer lightmatter --app $APP_NAME
done
