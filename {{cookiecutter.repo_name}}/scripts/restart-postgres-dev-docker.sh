# invocation:
#
# Make sure PGPORT, PGUSER, PGHOST, and PGPASSWORD are set correctly inside
# .env, and then:
#
# set -a;
# source .env;
# bash restart-postgres-dev-docker.sh;

IMAGE='postgres:latest'
CONTAINER='{{cookiecutter.database_name}}-postgres-container';

docker stop $CONTAINER;
docker rm $CONTAINER;
docker rmi $IMAGE;

docker run -p $PGPORT:5432 --name $CONTAINER -e POSTGRES_PASSWORD=$PGPASSWORD -d postgres;
