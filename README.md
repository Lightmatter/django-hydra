# Hydra

## About

Hydra is a robust project template which uses Django 4 on the backend and HTMX, AlpineJS, and Tailwind on the frontend.

This combination of technologies means:

-   You'll spend less time writing custom Javascript
-   Keep frontend code near the [locality of behavior](https://htmx.org/essays/locality-of-behaviour/)
-   You'll leverage the strengths of both Django and consise templates to render content quickly and easily
-   You'll be easily able to extend this template for customized use cases

But perhaps the best thing about Hydra is that once you're familiar with it, _it's just fun to use_!

## Prerequisites

NOTE: For Mac systems, the following script will handle installing the entirety of the project, including the prerequisites below.

Run the following to complete installation:

```bash
git clone git@github.com:Lightmatter/django-hydra.git
./django-hydra/scripts/mac_intel_install.sh
```

It's recommended that you read the output of this script to ensure everything went smoothly,
particularly if you are using Apple silicone (M1-based-mac).

The following items are required in order for Hydra to function:

-   [node](https://nodejs.org/en/download/):
    -   [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
-   [python3](https://www.python.org/downloads/), although [pyenv](https://github.com/pyenv/pyenv) is recommended to manage versions
    -   [cookiecutter](https://cookiecutter.readthedocs.io/en/1.7.2/installation.html)
-   bash ([WSL2](https://docs.microsoft.com/en-us/windows/wsl/install-win10) or [Cygwin](https://cygwin.com/install.html) recommended for windows users)
-   [postgres](https://www.postgresql.org/download/)
-   [poetry](https://python-poetry.org/docs/) virtual environment/package manager (requires python 3.11+)
-   [direnv](https://direnv.net/docs/installation.html) handles activating your virtual env when you enter the project directory

### For Windows Users:

-   In order for poetry to run on the correct python version, you will want to make sure that python3 resolves to python 3.11 in your shell

`(Invoke-WebRequest -Uri https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py -UseBasicParsing).Content | python3 -`
n.b. if you are using a bash shell, you should run the version of this command in the macOS section above

### For Users With Existing Development Environments:

- Make sure you upgrade to the latest, node (at least 18.x.x at time of writing), python (at least 3.11.1 at time of writing) and poetry (at least 1.3.1 at time of writing) versions
- if upgrading your poetry version, make sure you [clear the caches](https://python-poetry.org/docs/cli/#cache-clear)

## Quick Start

The following is the quickest path to get your project up and running, for more details on the project itself or more help getting started, visit
[Hydra's Documentation on Read the Docs](https://django-hydra.readthedocs.io/)

#### Before you create any projects with this template

-   Ensure that your git is properly setup with your username and email in order for the initial commit to have the correct log.
-   Project names must be composed of lowercase alphanumeric characters only, with no spaces or special characters.

### Setting up the project

There are two main scripts that you need to know about in this template, `create_new_project.sh` and `setup_existing_project.sh`.
These both do pretty much what they say, however here is an expanded list of what each will do when run:

-   Create a poetry/direnv virtual environment
-   install python and js requirements (dev and regular) via poetry and npm (or optionally yarn)
-   Create a database
-   Run the django migrations
-   Setup git

You should now follow the below guide depending on whether you are setting up a new project entirely, or getting spun up on a new one.

#### If you are setting up a new project from scratch

Run the below commands in order:

1. Clone the template

```bash
$ git clone https://github.com/Lightmatter/django-hydra
```

-   at the moment you will also want to do the following before running step 2:

```bash
$ cd django-hydra
$ cd ..
```

2. While in the directory containing/directly above the django-hydra directory, use cookiecutter to create a new version of the project through the following command:

```bash
$ cookiecutter django-hydra
```

It will ask you the following questions about your project, with the default in brackets:

1.) Project Name (directory-friendly syntax)
2.) Verbose Project Name
3.) Repo Name
4.) Author Name
5.) Author Email
6.) Organization Name
7.) Project Description
8.) Domain Name
9.) Project Version

Once you've answered the prompts, your project will be created in the same directory as django-hydra

3. Navigate into the project directory that you just created

```bash
$ cd <project_name>
```

You may see an error output initially (missing .env file) as you navigate into the directory. We'll create that .env file and complete project set up by running:

```bash
$ ./scripts/create_new_project.sh
```

4. Run Django server with runserver_plus

```bash
$ ./manage.py runserver_plus
```

4. In a new shell tab/window navigate to the project directory and run the vite server

```
$ npm run dev
```

5. You will now be able to view the project at http://127.0.0.1:8000/ or http://localhost:8000

#### If you are settiing up a project that someone else created

Run the below commands in order:

The recommended start pattern is described below. The setup_existing_project.sh command will

-   install python and js requirements (dev and regular) via poetry and (or optionally yarn)
-   create a database
-   run the migrations
-   and setup git

1. Grant permissions to the `setup_existing_project.sh`

```bash
$ chmod +x ./scripts/setup_existing_project.sh
```

2. Execute the `setup_existing_project` script

```bash
$ ./scripts/setup_existing_project.sh
```

3. Run Django server with runserver_plus

```bash
$ ./manage.py runserver_plus
```

4. In a new shell tab/window navigate to the project directory and run the vite server with npm run dev

```bash
$ npm run dev
```

5. You will now be able to view the project at http://127.0.0.1:8000/ or http://localhost:8000

# Testing the Template

To ensure that your template is working, you can run the `test.sh` script.
The `test.sh` will do a run of the template, and then run the django tests and [prospector](https://pypi.org/project/prospector/) against it.

```
$ test.sh keepenv
```

_Note If you do not pass the argument keepenv, it will delete the old virtualenvironment. If you want to do this, simply run_

```
$ test.sh
```

# Testing/Validation within your Project

This will be run automatically when you attempt to commit code but if you want to manually validate/fix your code syntax during development you can run

```bash
$ poetry run pre-commit run --all-files
```

Django tests can be run by running

```bash
$ pytest
```

# Installing

The `setup_existing_project.sh` and the `create_new_project.sh` scripts will automatically install both the JavaScript and the Python dependencies, however if you need to install them yourself manually at a later date, you can run the below commands independently to do that.

## Install JavaScript dependencies

```
$ npm install
```

## Install Python Dependencies

```
$ ./scripts/setup_python.sh
```

but once that's been run the first time you can just run

```
$ poetry install
```

# Configuring environment variables

Before you may develop on the app itself you will need a `.env` file. Provided in the template is a `.env.example` which can be copy and pasted into a new .env file. It is worth noting that when a new project is created via `create_new_project.sh`, the `.env.example` will be copied to new instance under `.env`. This template leverages this file using the dotenv JavaScript library as part of Vite.

## Accessing Environment Variables in Python

Env vars are available in all settings file, more details here <https://django-environ.readthedocs.io/en/latest/index.html>

## Accessing Environment Variables in JavaScript/TypeScript

Env vars are available in all .js files and html script tags using the global var import.meta.env.{VARIABLE_NAME}, more details here <https://vitejs.dev/guide/env-and-mode.html>

# Running the local development servers

This app uses webpack to compile/transpile assets. The app is equipped to be served from `127.0.0.1:8000` or `localhost:8000`

First run the python server

```bash
$ ./manage.py runserver_plus
```

Then in a new tab, run the vite server

```bash
$ npm run dev
```

# Deployment

This will be run automatically when you attempt to commit code but if you want to manually validate/fix your code syntax during development you can run

```bash
$ poetry run pre-commit run --all-files
```

This app is set up to use circleci, but could be extended to any build process. Circle will automatically run

```bash
$ poetry run pre-commit run --all-files
$ poetry run playwright install
$ poetry run coverage run --source='.' -m pytest
```
