# parse out .env so that we only store config values in one place
export PGUSER=$(grep 'DATABASE_URL' .env |awk -F '@' '{print $1}' |awk -F ':' '{print $2}' |tr -d '\/');
export PGPASSWORD=$(grep 'DATABASE_URL' .env |awk -F '@' '{print $1}' |awk -F ':' '{print $3}');
export PGHOST=$(grep 'DATABASE_URL' .env |awk -F '@' '{print $2}' |awk -F '/' '{print $1}' |awk -F ':' '{print $1}');
export PGPORT=$(grep 'DATABASE_URL' .env |awk -F '@' '{print $2}' |awk -F '/' '{print $1}' |awk -F ':' '{print $2}')
export PGDATABASE=$(grep 'DATABASE_URL' .env |awk -F '@' '{print $2}' |awk -F '/' '{print $2}' |tr -d '\"');
export ENV_NAME=$PGDATABASE;

if [ -z $PGPORT ]
then
    PGPORT=5432
fi
