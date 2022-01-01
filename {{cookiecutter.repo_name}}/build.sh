#!/usr/bin/env bash
# exit on error
set -o errexit

poetry install --no-dev

python manage.py collectstatic --no-input
python manage.py migrate

npm install --no-fund
npm run build
