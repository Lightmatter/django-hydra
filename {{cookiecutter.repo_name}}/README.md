# {{ cookiecutter.project_name_verbose }}

## Overview
{{ cookiecutter.description }}

## Local Development Setup Instructions
- Install PostgreSQL server and client on your local computer
    - For Mac: use Homebrew: `brew install postgresql`
- Install virtualenvwrapper <https://virtualenvwrapper.readthedocs.io/en/latest/install.html#basic-installation>
- Run the start script: `./scripts/start.sh` from the project root
    - This will install the pip and yarn packages and set up the local database for the project
##### Local Server Process
You will be running two concurrent servers.

- Run the Django server using `./manage.py runserver` from the project root
    - you may choose to run `./manage.py runserver_plus` instead as this provides more debugging features
- Open a second shell tab
- In this second tab, run the webpack server `npm run dev`, which serves the SCSS, JS and similar file types from the project root
    - The site's landing page should automatically open in a browser window/tab

## Remote Server Setup Instructions
- Remote Heroku servers can be created by running `./scripts/setup-heroku.sh`

## Differences between Local and Remote
- Static Files:
    - Static files (especially those from third-party packages) will not be compiled/minified as part of a local/development build
    - Static files will be compiled/minified and pushed to a static/ directory on the remote server
- Emails:
    - Emails will be printed to the console when being "sent" during local development
    - Emails will be pushed to a third party service for sending on the remote server (n.b. this must be set up separately and configured through the relevant Django settings)

## Github
- This repo is setup to use lint-staged and husky in order to do some clean up prior to committing your code. If js, css or scss files are present in your commit they will be linted. If you notice your files are not being linted every time you commit (with information printed from Husky... 'Running tasks...') then you should try uninstalling all npm packages and reinstalling. If git is not initialized before npm packages installed this will fail.

## Running Tests
n.b. you must be at the project root to run these commands

- make sure you are still in the environment, otherwise run `workon {{ cookiecutter.project_name }}`
- run `./manage.py test` which runs the Django test suite
- also run:
    - `bandit -r {{ cookiecutter.project_name }}/ -l --ini .bandit -x tests.py`
    - `isort --multi-line=3 --trailing-comma --force-grid-wrap=0 --use-parentheses --line-width=88 --recursive --builtin django --skip-glob "00*.py" --skip "jinja.py" --check-only {{ cookiecutter.project_name }}/`
        - in order to actually update the code with this command remove `--check-only`
    - `prospector {{ cookiecutter.project_name }} -X -I "{{ cookiecutter.project_name }}/settings/*"`

    to check code syntax and security

## Useful Commands - pulling remote database, shell_plus, runserver_plus, AWS stuff
n.b. you must be at the project root to run any `./manage.py ...` or `./scripts/...` commands

- Pull Remote Database (to replace the local {{ cookiecutter.project_name }} database with one of the live databases):
    - Install and log into the the Heroku CLI:
        - For Mac: use Homebrew: `brew tap heroku/brew && brew install heroku` from <https://devcenter.heroku.com/articles/heroku-cli>
    - run `./scripts/pull_remote_db.sh`
    - in order to pull a database besides the dev database change `$ENV_NAME-dev` in line 6 of the pull_remote_db.sh file to match the correct Heroku app
- Django Shell (to access the local database through the Django ORM/shell):
    - run `./manage.py shell_plus`
- Django Shell on Remote Server ***<span style="color:red;">(caution: this can potentially change/delete production data. Use with a healthy amount of caution and capture a database backup first (see below for instructions))</span>***:
    - Install and log into the the Heroku CLI:
        - For Mac: use Homebrew: `brew tap heroku/brew && brew install heroku` from <https://devcenter.heroku.com/articles/heroku-cli>
    - open a bash shell on the remote server: run: `heroku run bash --app [app name such as {{ cookiecutter.project_name }}-dev]`
    - once in the shell on the Heroku server run: `./manage.py shell_plus`
- Capture a Remote Database Backup:
    - run: `heroku pg:backups:capture --app [app name such as {{ cookiecutter.project_name }}-dev]`
- Retrieve Media assets from AWS S3:
    - Set up and configure the AWS CLI: see <https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html> for instructions
        - be sure to set up your AWS config with your {{ cookiecutter.project_name }} credentials: instructions here <https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html>

    - make sure a directory exists with the path [project root]/{{ cookiecutter.project_name }}/media
    - from the project root run: `aws s3 cp s3://{{ cookiecutter.project_name }}-dev ./{{ cookiecutter.project_name }}/media --recursive` replacing `{{ cookiecutter.project_name }}-dev` with `{{ cookiecutter.project_name }}-prod` or a different s3 bucket name as needed

## Styleguide

visit `/styleguide` to see the basic style guide. It will look gross and is meant to be modified as needed per project


## Watchman file reloader

Use watchman for better performance when using the django dev server. pywatchman is installed as part of dev requirements, but you must install watchman at a system level. See <https://facebook.github.io/watchman/docs/install> for instructions

You can validate that it's working correctly when you do runserver - you should see "Watching for file changes with WatchmanReloader"
If it's not working you will see "Watching for file changes with StatReloader"

## Wagtail

If the project is using wagtail a new app will be included called `wagtailapp`. Additionally in the settings/base.py file there will be new wagtail specific settings.

Several blocks have been included to start TitleBlock, LinkBlock, ColumnBlock, RowBlock, SectionBlock, and SocialBlock. These are used in wagtail streamfields set up and ready to use. No styling has been included for them so they will need styling, but do have templates present. Currently the main block you can add to a ContentPage is a SectionBlock. This contains a Row or a Spacer. Rows contain Columns and Columns contain title, link, text and image. These are commonly seen patterns in our projects and are not necessary if you need to remove them/have no need for them.

We have added h1 and h5 to the wagtail cms richtext editor as they do not come out of the box.
