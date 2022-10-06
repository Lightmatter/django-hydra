# Lightmatter Django Template

# About

A generic template for Django 4 using htmx based templates, Vite and Alpine.js that can be easily extended for various needs

# Prerequisites

The following items are required in order for this template to work.

Note: For Mac systems, there is an automatic installation script that handle these dependences - jump right to the macOS section to complete setup

## Dependencies

* [node](https://nodejs.org/en/download/):
  * [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
  * [yarn](https://classic.yarnpkg.com/en/docs/install/)
  * [webpack](https://webpack.js.org/guides/installation/)
* [python3](https://www.python.org/downloads/), although [pyenv](https://github.com/pyenv/pyenv) is recommended to manage versions:
  * [cookiecutter](https://cookiecutter.readthedocs.io/en/1.7.2/installation.html)
* [git](https://git-scm.com/downloads)
* bash ([WSL2](https://docs.microsoft.com/en-us/windows/wsl/install-win10) or [Cygwin](https://cygwin.com/install.html) recommended for windows users)
* [postgres](https://www.postgresql.org/download/)
* [poetry](https://python-poetry.org/docs/) virtual environment/package manager
* [direnv](https://direnv.net/docs/installation.html) handles activating your virtual env when you enter the project directory


## Environment configuration

There is also a certain amount of environmental configuration that must be done in order for the above dependencies and the below template to work.

*** If you have a setup guide/a setup process that works for windows or a particular linux distro, please add it below for the benefit of future developers. If you use a specific, non-standard shell (not bash or zsh or similar), please call that out in your instructions as well. ***

### macOS

To install on a mac based operating system, you can use the install script to setup everything.

Run the following script block to get setup:

``` bash
git clone git@github.com:Lightmatter/django-hydra.git
./django-hydra/scripts/mac_intel_install.sh
```

It's recommended that you read the output of this script to ensure everything went smoothly,
particularly if you are using Apple silicone (M1-based-mac).

### Windows

#### Dependencies
* You will need to install Poetry (which requires python 3.10 or greater at the moment), `(Invoke-WebRequest -Uri https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py -UseBasicParsing).Content | python3 -` n.b. if you are using a bash shell, you should run the version of this command in the macOS section above
    * In order for poetry to run on the correct python version, you will want to make sure that python3 resolves to python 3.10 in your shell

### Not macOS (including Windows)

#### Dependencies
* You will need to install direnv, platform specific installation instructions are available here <https://direnv.net/docs/installation.html>

## Before you create any projects with this template
* Ensure that your git is properly setup with your username and email in order for the initial commit to have the correct log.
* Project names must be composed of lowercase alphanumeric characters only, with no spaces or special characters.

# Setting up the project

There are two main scripts that you need to know about in this template, `create_new_project.sh` and `setup_existing_project.sh`.
These both do pretty much what they say, however here is an expanded list of what each will do when run:

* Create a poetry/direnv virtual environment
* install python and js requirements (dev and regular) via poetry and npm (or optionally yarn)
* Create a database
* Run the django migrations
* Setup git

You should now follow the below guide depending on whether you are setting up a new project entirely, or getting spun up on a new one.

## If you are setting up a new project from scratch

Run the below commands in order:

The recommended start pattern is described below. The create_new_project.sh command will
* Create a poetry/direnv virtual environment
* install python and js requirements (dev and regular) via poetry and npm (or optionally yarn)
* create a database
* run the migrations
* and setup git

1. Clone the template

```bash
$ git clone https://github.com/Lightmatter/django-hydra
```

 * at the moment you will also want to do the following before running step 2:

```bash
$ cd django-hydra
$ git checkout 3.0
$ cd ..
```

2. Use cookiecutter to create a new version of the project. It will ask you some questions about which integrations you might want. Once you've answered all the questions/prompts, the project creation script (create_new_project.sh) will be run automatically by cookiecutter and should install all dependencies and run all necessary setup. If the new project is created but the creation script fails, you can run `./scripts/create_new_project.sh` from within the new project directory.

```bash
$ cookiecutter django-hydra
```
* this command should be run from the directory containing/directly above the django-hydra directory
3. Navigate into the project directory that you just created

```bash
$ cd <project_name>
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

## If you are settiing up a project that someone else created

Run the below commands in order:

The recommended start pattern is described below. The setup_existing_project.sh command will
* install python and js requirements (dev and regular) via poetry and (or optionally yarn)
* create a database
* run the migrations
* and setup git

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

4. In a new shell tab/window navigate to the project directory and run the vite server with npn run dev

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

*Note If you do not pass the argument keepenv, it will delete the old virtualenvironment. If you want to do this, simply run*

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


# Debugging
To access a python shell pre-populated with Django models and local env
```bash
$ ./manage.py shell_plus
```
To add a breakpoint in your python code:
Add the following code to your `.bashrc` or `.zshrc`:
```bash
$ export PYTHONBREAKPOINT="pudb.set_trace"
```
Then add the following to your python code:
```python
breakpoint()
```
If the above fails or you prefer a more immediate solution, you can add the following to your code:
```python
import pudb; pu.db
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

# WORKFLOW to write back to template
Create an instance of the template using cookiecutter. Create changes in the sample app, and commit to git on a new feature branch. Then go back into the `generic-django-conf` folder and run:

1) `git config --global init.defaultBranch main`. When using this command, `main` should be the name of the primary branch of the instantiated project, not the primary branch of the template.
2) `retrocookie --branch=your-branch-name ../your-project-name`

This will attempt to take the git diff of the prior commit and apply it back to the template. When adding new dependencies to a project, always delete the `poetry.lock` file and recreate it before committing, otherwise it won't merge correctly. The documentation for retrocookie is here: <https://pypi.org/project/retrocookie/>

# Upcoming Features
Things we still want to do
```
  caching everything possible (middleware for sure)
  user useradmin
  django-secure
  django robots
  user feedback
  add django password validators
  Front end updates
    * SEO compitbility scrub
    * Accessibility compatibility scrub
```
