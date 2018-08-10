#!/bin/bash

source scripts/get-env-secrets.sh;

# Invocation:
# bash restart-postgres-dev-docker.sh;


IMAGE='postgres:latest'
CONTAINER='{{ cookiecutter.repo_name }}-postgres-container';

docker stop $CONTAINER;
docker rm $CONTAINER;
docker rmi $IMAGE;

docker run -p $PGPORT:5432 --name $CONTAINER \
       -e POSTGRES_PASSWORD=$PGPASSWORD \
       -e POSTGRES_USER=$PGUSER \
       -e POSTGRES_DB=$PGDATABASE \
       -d postgres;

sleep 5s;

psql -c "alter user "$PGUSER" superuser;";

scripts/pull_remote_db.sh;
