#!/bin/bash
echo "Making Virtual Environment"
mkvirtualenv {{ project_name }}
echo "Installing requirements"
pip install -r requirements
echo "Creating Database"
psql createuser {{ project_name }} with encrypted password "{{ project_name }}" login
psql createdb {{ project_name }} --owner={{ project_name }}
echo "Syncdb and Migrate"
chmod +x manage.py
./manage.py syncdb --migrate



