#!/usr/bin/env bash
# exit on error
set -o errexit

poetry install --no-dev

npm install --no-fund
npm run build

python manage.py collectstatic --no-input
python manage.py migrate


poetry run python ./scripts/create_bucket.py
