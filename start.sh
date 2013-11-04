#!/bin/echo
ENV_NAME="light"
ENV_OPSTS="--no-site-packages --distribute"
unset PYTHONDONTWRITEBYTECODE
echo "Making Virtual Environment"
source $(which virtualenvwrapper.sh)
cd $WORKON_HOME
$VIRTUALENVWRAPPER_VIRTUALENV $ENV_OPTS $ENV_NAME
cd -
workon $ENV_NAME
pip install -r requirements-dev.txt


