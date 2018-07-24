# invocation:
#
# replace $PGPASSWORD with actual dev password:
#
# PGPORT=5432 PGUSER=postgres PGHOST=localhost PGPASSWORD=foo bash restart-postgres-dev-docker.sh
#
# alternately:
#
# export PGPORT=5432 PGUSER=postgres PGHOST=localhost PGPASSWORD=foo;
#
# bash restart-postgres-dev-docker.sh;

IMAGE='postgres:latest'
CONTAINER='{{cookiecutter.database_name}}-postgres-container';

docker stop $CONTAINER;
docker rm $CONTAINER;
docker rmi $IMAGE;

docker run -p $PGPORT:5432 --name $CONTAINER -e POSTGRES_PASSWORD=$PGPASSWORD -d postgres;
