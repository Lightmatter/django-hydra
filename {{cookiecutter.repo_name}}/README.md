
# {{ cookiecutter.project_name_verbose }}

## Overview
{{ cookiecutter.description }}

## Project Structure
This project is divided into 2 major parts: Next.js frontend and Django backend.
It's deployed on a docker image, with a nginx server to direct traffic between the two services

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
- Refer to remote server setup instructions if setting up heroku
    - NOTE: we no longer recommend using ./scripts/setup_heroku.sh

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


## Environment Variables
- `.env` This handles the environment variables for Next.js and django. If you want access to an env variable at build time in Next.js it must start with `NEXT_PUBLIC`

## Adding a new envrionment variable to DJANGO

Store all django environment variables inside of heroku
1. heroku stores secrets, so add variable to heroku through `heroku config:set foo=bar`
2. instruct django to use the envrionment variable by adding a line to a settings file `foo = env("foo")`

## Adding a new envrionment variable to NEXT

note - next only uses variables provided to it at build. All new variables will require a rebuild of the application.

1. Circle stores build time secrets, so add secret to circle through web ui OR store in heroku and use `heroku config:get VARIABLE`
2. Make sure secret is passed to docker build process by adding a --build-arg line in circleci/config.yml
3. make sure docker picks up secret at build time by adding an ARG statement to docker file
4. Update next.js config file to pick up envrionment variable.


### How to debug the node server
The default honcho command runs `dev` but the package.json contains another command, `debug`. If you run `yarn run debug` or `yarn debug` you will be able to evaluate debugger statements inside of a chrome tab by browsing to `chrome://inspect` and clicking on the entry for the node process.

### How to debug python/django
Honcho isn't great with using pdb or ipdb to debug python code. It's recommended to use the separate commands described above if python needs debugging.

## Running Tests
NOTE: you must be at the project root to run these commands

#### DJANGO
- make sure you are still in the environment, otherwise run `workon {{ cookiecutter.project_name }}`
- run `./manage.py test` which runs the Django test suite
- also run:
    - `scripts/validate.sh`
  to check code syntax and security

#### NEXT.JS
- at the root of the folder run `yarn run test` or `yarn test` to run the jest tests
- debug next tests with `yarn test:debug` and include a `debugger` in a test or code related to a test
- or run `yarn run cypress run` or `yarn cypress run` to run the cypress integration tests - this requires the next dev server to be running in another tab

## Why use two processes as the same application
This application model is unique in that we are running two applications simultaniously - one managing the frontend of the application and one managing the api. We run both servers on the same box in production as well. This tight coupling gives us a couple of strong guarentees:
1) all communication between server side communication and api is done over locahost, and so doesn't pay a network cost. With next.js tools like getServerSideProps, which will funnel all requests through the backend, this allows us to make multiple api requests per page load concurrently using async syntax, but only pay the cost of a single network request.
2) A shared domain allows for http only cookie based authentication, giving strong protection against xss attacks.
3) Envrionment variables and build artifacts can be shared between processes. This ensures things like the build id are shared between frontend and backend, or static assets can go through django's cachebusting collectstatic process.



## Remote Server Setup Instructions
The application is meant to be hosted with the included docker file, which sets up NGINX, Django and yarn and runs all three on a single server.
This is done so that communication between the yarn process and the Django process is free - allowing very cheap server side renders, and bundling of api requests fetched via getServerSideProps.

Setup for the remote environment is handled through terraform.
1) create an AWSCLI profile with an access key and secret for the account you want to use to host media. This should either be your default profile, or you can pass the profile as a var to terraform
2) Manually install the terraform sentry plugin (https://www.terraform.io/docs/plugins/basics.html#installing-plugins) (https://github.com/jianyuan/terraform-provider-sentry) 
2) set an environment variable for SENTRY_AUTH_TOKEN and TF_VAR_SENTRY_AUTH_TOKEN after getting the token through the sentry web UI
  a) To get the auth token, in the sentry webapp dashboard, go to User Menu > API Keys
  b) Note that the .env file isn't read by terraform - so set this variable in your .bashrc or through export
3) Ensure you're logged in to Heroku through the Heroku cli
4) Finally Remote Heroku servers and AWS infrastructure can be created by going to the terraform/environments folder and running `terraform init` followed by `terraform apply`


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

## Wagtail

If the project is using wagtail a new app will be included called `wagtailapp`. Additionally in the settings/base.py file there will be new wagtail specific settings.

Several blocks have been included to start TitleBlock, LinkBlock, ColumnBlock, RowBlock, SectionBlock, and SocialBlock. These are used in wagtail streamfields set up and ready to use. No styling has been included for them so they will need styling, but do have templates present. Currently the main block you can add to a ContentPage is a SectionBlock. This contains a Row or a Spacer. Rows contain Columns and Columns contain title, link, text and image. These are commonly seen patterns in our projects and are not necessary if you need to remove them/have no need for them.

We have added h1 and h5 to the wagtail cms richtext editor as they do not come out of the box.

## Project best practices

-   Use [Prettierjs](https://prettier.io/) to format your javascript code. This will happen automatically on commit but is helpful to have configured to run on save.
-   Preferred naming structure for all components .jsx files is PascalCase. so for a react component named PasswordField the filename would be PasswordField.jsx
    -   Next.js uses the filename in `/pages` directory to determine the route name so for now those should be named lowecased with dashes if necessary
-   When in doubt refer to [AirBnB best practices](https://github.com/airbnb/javascript/tree/master/react)

## Redirecting new urls to the django server

The nginx service that directs all incoming traffic has several paths hardcoded as going directly to the django server. To open up a new path edit the webapp.conf inside image/config

## Managing subdomains

Because the django server and the nextjs server are sharing authentication through cookies, it's important they stay on the same domain. There's three parts to consider when looking at how to arrange the domains serving the app - the api domain, the nextjs domain and the domain used between the two servers. A simple example would be the production hosting of both sides of the app on foo.com - the api would be reachable on foo.com/api, the next.js server would be on foo.com, and server to server communication would be over 127.0.0.1. In this case when loading a page from scratch you'd load on foo.com, then the next.js would forward the cookies to 127.0.0.1 (but still use the cookies from foo.com), and then return an authenticated response. When communicating directly to the api to login or make a post request, you'd address foo.com/api, and so cookies would still be correctly set for both frontend and backend, because they would both live under foo.com . For local development, you'd need a similar guarentee - that's why we force local development onto 127.0.0.1 and not localhost, because if the api domain doesn't match how you're addressing the client, things will break in strange ways.
If you decide in the future that you want to move the two applications to different subdomains, say www and api, you can do that as long as you configure the cookie to be shared by domain rather than subdomain

## Important Libraries in project

-   [date-fns](https://date-fns.org/docs/Getting-Started) - An alternative and SIGNIFICANTLY smaller to Moment.js. MomentJS should not be needed.
-   [Material UI](https://material-ui.com/) - Pretty self explanatory but before you build a component you may want to check here because they likely have it or things you can use to build it. - [Material UI Icons](https://material-ui.com/components/material-icons/) - useful list of icons for project and how to import them.
-   [Constate](https://github.com/diegohaz/constate) - Write local state using [React Hooks](https://reactjs.org/docs/hooks-intro.html) and lift it up to [React Context](https://reactjs.org/docs/context.html) only when needed with minimum effort.
-   [Formik](https://jaredpalmer.com/formik/docs/overview) - All forms on the site use Formik - [Formik Material UI](https://github.com/stackworx/formik-material-ui) - bindings for formik with Material UI input fields - [Yup](https://github.com/jquense/yup) - Schema for formik forms
-   [Axios](https://github.com/axios/axios) - Promise based HTTP client
-   [clsx](https://github.com/lukeed/clsx/) - A library to create html safe class name strings out of variables and datastructures

TO ADD

New react libraries

-   next.js - server side rendering
-   build + serve vs dev
-   static optimization
-   Get getInitialProps and getServerSideProps
-   material UI
-   Yup and Formik
-   useSWR
    Arch
-   Running both backend and server on the same server
-   axios automatically figuring out the base url
-   with auth
    Docker
-   Base image
-   nginx
-   Runnit
    Local development
-   honcho start
-   localhost vs 127
    Testing + Debugging
-   debug watcher
-   browser based debugging for node
-   seperate threads when in debugging
-   cypress
-   jest
-   cypress + django

Documentation

-   How to start the server
-   how to debug the node server
-   how to debug the django server
-   api base url

more high level stuff
"django rest framework is used for the backend and djoser for the auth"

cookie management

Steps to host api and frontend on different domains
