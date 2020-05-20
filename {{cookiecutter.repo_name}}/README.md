# {{ cookiecutter.project_name_verbose }}

## Overview
{{ cookiecutter.description }}

## Project Structure
This project is divided into 2 major parts: Next.js frontend and Django backend.

- `/public` - Static media directory for Next.js
- `/src` - The Next.js project root
	- `__tests__` - jest and cypress tests
	- `components` - Reusable components meant to be used anywhere on the site
	- `pages` - Next.js pages.
	- `constants` - Constants are stored here, some exist on project init for form validation.
	- `models` - General repositories for shared api logic. For instance `models/user.js` contains mostly axios data fetches but also handles [constate](https://github.com/diegohaz/constate) sharing of user data across the app.
	- `theme` - Contains the [Material UI theme](https://material-ui.com/customization/theming/). This contains overarching styles for the application and determines appearance of Material UI components globally.
	- `util` - General reusable utility functions
- `/{{ cookiecutter.project_name }}` - the Django project folder
	- `account` - User related logic, views, models, etc.
	- `home` - Handles home page for django, error endpoint, settings context processor
	- `wagtailapp` - If wagtail was used via the cookiecutter setup script, this is where wagtail models, views, etc. are created
	- `{{ cookiecutter.project_name }}` - Project settings, asgi settings, and base urls
	- `util` - Container for general utility classes, functions, etc.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
- Node >=10.14.2
- python 3.8
- Install PostgreSQL server and client on your local computer
    - For Mac: use Homebrew: `brew install postgresql`
    - For Ubuntu: apt-get install postgresql
- Install virtualenvwrapper <https://virtualenvwrapper.readthedocs.io/en/latest/install.html#basic-installation>

## Local Development Initial Setup
- Run the start script: `./scripts/start.sh` from the project root
    - This will install the pip and yarn packages and set up the local database for the project

#### Quick start

- Run `honcho start` to start the application
- go to "127.0.0.1:3000" in a browser

## Local Server Process
You will be running two concurrent servers, a backend and a frontend server.

- In a terminal window, run the Django backend server using `./manage.py runserver` from the project root, which will start the server on 127.0.0.1:8000
    - You may choose to run `./manage.py runserver_plus` instead as this provides more debugging features
- Run the Next.js frontend server `yarn run dev` or `yarn dev` which will start the server on 127.0.0.1:3000

These commands are embedded in the proc file at the root of the repo - you may also run both servers simultaneously via [honcho](https://honcho.readthedocs.io/en/latest/), installed with the dev requirements.
- you can run honcho via `honcho start`


### How to debug the node server
The default honcho command runs `dev` but the package.json contains another command, `debug`. If you run `yarn run debug` or `yarn debug` you will be able to evaluate debugger statements inside of a chrome tab by browsing to `chrome://inspect` and clicking on the entry for the node process.

### How to debug python/django
Honcho isn't great with using pdb or ipdb to debug python code. It's recommended to use the separate commands described above if python needs debugging.

## Running Tests
NOTE: you must be at the project root to run these commands

## Environment Variables
- `.env` This handles the environment variables for Next.js and django. If you want access to an env variable at build time in Next.js it must start with `NEXT_PUBLIC`

#### DJANGO
- make sure you are still in the environment, otherwise run `workon {{ cookiecutter.project_name }}`
- run `./manage.py test` which runs the Django test suite
- also run:
    - `scripts/validate.sh`
  to check code syntax and security

#### NEXT.JS
- at the root of the folder run `yarn run test` or `yarn test` to run the jest tests
- or run `yarn run cypress run` or `yarn cypress run` to run the cypress integration tests - this requires the next dev server to be running in another tab

## Remote Server Setup Instructions
The application is meant to be hosted with the included docker file, which sets up NGINX, Django and yarn and runs all three on a single server.
This is done so that communication between the yarn process and the Django process is free - allowing very cheap server side renders, and bundling of api requests fetched via getServerSideProps.

Setup for the remote environment is handled through terraform.
1) create an AWSCLI profile with an access key and secret for the account you want to use to host media. This should either be your default profile, or you can pass the profile as a var to terraform
2) manually install the terraform sentry plugin to configure sentry reporting
3) set an environment variable for SENTRY_TOKEN and TF_VAR_SENTRY_TOKEN after getting the token through the sentry web UI
4) Ensure you're logged in to Heroku through the Heroku cli
5) Finally Remote Heroku servers and AWS infrastructure can be created by going to the terraform/environments folder and running `terraform init` followed by `terraform apply`


## Differences between Local and Remote
- Emails:
    - Emails will be printed to the console when being "sent" during local development
    - Emails will be pushed to a third party service for sending on the remote server (n.b. this must be set up separately and configured through the relevant Django settings)
- Next execution context
   - Locally next will run with `yarn dev` which will turn on hot reloading and JIT compilation of the JS code.
   - Remotely next will first run `yarn build` to create a set of static assets and then run `yarn start` to handle routing traffic and doing SSR

## Github
- This repo is setup to use [lint-staged](https://github.com/okonet/lint-staged) and [husky](https://github.com/typicode/husky) in order to do some clean up prior to committing your code. If js, css or scss files are present in your commit they will be linted. If you notice your files are not being linted every time you commit (with information printed from Husky... 'Running tasks...') then you should try removing node_modules and running `yarn` again. If git is not initialized before node_modules installed this will fail continually.


## Useful Commands
NOTE: you must be at the project root to run any `./manage.py ...` or `./scripts/...` commands

### Pulling remote database
- Pull Remote Database (to replace the local {{ cookiecutter.project_name }} database with one of the live databases):
    - Install and log into the the Heroku CLI:
        - For Mac: use Homebrew: `brew tap heroku/brew && brew install heroku` from <https://devcenter.heroku.com/articles/heroku-cli>
    - run `./scripts/pull_remote_db.sh`
    - in order to pull a database besides the dev database change `$ENV_NAME-dev` in line 6 of the pull_remote_db.sh file to match the correct Heroku app

### shell_plus, runserver_plus, AWS stuff
- Django Shell (to access the local database through the Django ORM/shell):
    - run `./manage.py shell_plus`

### Heroku
- Django Shell on Remote Server ***<span style="color:red;">(caution: this can potentially change/delete production data. Use with a healthy amount of caution and capture a database backup first (see below for instructions))</span>***:
    - Install and log into the the Heroku CLI:
        - For Mac: use Homebrew: `brew tap heroku/brew && brew install heroku` from <https://devcenter.heroku.com/articles/heroku-cli>
    - open a bash shell on the remote server: run: `heroku run bash --app [app name such as {{ cookiecutter.project_name }}-dev]`
    - once in the shell on the Heroku server run: `python3.8 manage.py shell_plus`
- Capture a Remote Database Backup:
    - run: `heroku pg:backups:capture --app [app name such as {{ cookiecutter.project_name }}-dev]`

### AWS

- Retrieve Media assets from AWS S3:
    - Set up and configure the AWS CLI: see <https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html> for instructions
        - be sure to set up your AWS config with your {{ cookiecutter.project_name }} credentials: instructions here <https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html>
    - make sure a directory exists with the path [project root]/{{ cookiecutter.project_name }}/media
    - from the project root run: `aws s3 cp s3://{{ cookiecutter.project_name }}-dev ./{{ cookiecutter.project_name }}/media --recursive` replacing `{{ cookiecutter.project_name }}-dev` with `{{ cookiecutter.project_name }}-prod` or a different s3 bucket name as needed

## Styleguide

TODO storybook

## Watchman file reloader

Use watchman for better performance when using the django dev server. pywatchman is installed as part of dev requirements, but you must install watchman at a system level. See <https://facebook.github.io/watchman/docs/install> for instructions

You can validate that it's working correctly when you do runserver - you should see "Watching for file changes with WatchmanReloader"
If it's not working you will see "Watching for file changes with StatReloader"

## Project best practices
- Preferred naming structure for all .jsx files is camel case. so for a react component named PasswordField the filename would be PasswordField.jsx
- When in doubt refer to [AirBnB best practices](https://github.com/airbnb/javascript/tree/master/react)
