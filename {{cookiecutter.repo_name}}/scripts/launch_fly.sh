# Must have flyctl installed and be logged in to fly
# https://fly.io/docs/getting-started/installing-flyctl/
set -e

# create two organizations on fly.io with the same name and one with -dev and one with -prod. Add credit cards to both
# Example: sampleappetest-dev and sampleapptest-prod
# The script will automatically create 6 apps, 3 in each org. Example: sampleapptest-dev-postgres, sampleapptest-dev-redis, sampleapptest-dev; same with prod
echo "What is the organization name on Fly (not including -dev or -prod)?"
read base_name

START_TIME=$(date +%s)

for env in dev prod; do
    ## ORG
    ORG_NAME="$base_name-$env"
    echo "Setting up $ORG_NAME"

    ## APP
    if [ "$env" = "prod" ]; then
        echo "You will be prompted WARN app flag '{{cookiecutter.repo_name}}-dev' does not match app name in config file 'sampleapptest'. Press y"
        # https://community.fly.io/t/work-around-prompts-dialogs-in-automated-environments/4963
    fi
    fly apps create --name $ORG_NAME -o $ORG_NAME ## create the initial app named the same as the org. Since app names are unique to all of fly, org names must also be unique. This is help by including the -dev and prod to the org names.
    echo "Created app $ORG_NAME in $ORG_NAME"
    DJANGO_SECRET_KEY=`python -c 'import random; print("".join([random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#%^&*(-_=+)") for i in range(50)]))'`
    echo "DJANGO_SECRET_KEY=$DJANGO_SECRET_KEY"
    fly secrets set DJANGO_SECRET_KEY="$DJANGO_SECRET_KEY" -a $ORG_NAME
    echo "Set DJANGO_SECRET_KEY"

    ## POSTGRES
    # https://fly.io/docs/reference/postgres/
    POSTGRES_NAME="$ORG_NAME-postgres"
    flyctl postgres create \ # these are the numbers for the smallest postgres you can make
        --organization $ORG_NAME \
        --name $POSTGRES_NAME \
        --region ord \
        --vm-size shared-cpu-1x \
        --volume-size 1 \
        --initial-cluster-size 1
    echo "Created postgres $POSTGRES_NAME in $ORG_NAME"
    fly postgres attach -a $ORG_NAME --postgres-app $POSTGRES_NAME
    echo "Attached $POSTGRES_NAME"

    ## REDIS
    # https://fly.io/docs/reference/redis/
    # verify that a directory called redis with fly.toml exists before running
    # if you get the error: Error failed to fetch an image or build from source: error connecting to docker: remote builder app unavailable
    # run fly apps destroy builder_name, then fly apps destroy the other apps in your org that have been created. Find these with fly apps list. Finally rerun this script.
    cd redis
    REDIS_NAME="$ORG_NAME-redis"
    fly apps create --name $REDIS_NAME --org $ORG_NAME
    fly volumes create redis_server --size 1 -r ord -a $REDIS_NAME
    REDIS_PASSWORD=`python -c 'import random; print("".join([random.choice("abcdefghijklmnopqrstuvwxyz0123456789!@#%^&*(-_=+)") for i in range(50)]))'`
    echo "REDIS_PASSWORD: $REDIS_PASSWORD"
    fly secrets set REDIS_PASSWORD="$REDIS_PASSWORD" -a $REDIS_NAME
    fly deploy -a $REDIS_NAME -r ord
    echo "Deployed $REDIS_NAME"

    cd ..
    
    fly secrets set REDIS_PASSWORD="$REDIS_PASSWORD"

    fly deploy -a $ORG_NAME -r ord
    echo "Deployed $ORG_NAME"
done

END_TIME=$(date +%s)
echo "It took $(($END_TIME - $START_TIME)) seconds to set up fly"