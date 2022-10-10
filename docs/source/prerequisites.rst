Prerequisites & Dependencies
==============

Before you create any projects with this template
--------------------------------------------------

* Ensure that your git is properly setup with your username and email in order for the initial commit to have the correct log.
* Project names must be composed of lowercase alphanumeric characters only, with no spaces or special characters.


Setting up for Installation
-------------
.. note::
   For Mac systems, there is an automatic installation script that handle dependencies for Hydra. Run the following commands to install via the script:

    .. code-block:: console

        git clone git@github.com:Lightmatter/generic-django-conf.git
        ./generic-django-conf/scripts/mac_intel_install.sh

<<<<<<< HEAD
It's recommended that you read the output of this script to ensure everything went smoothly,
particularly if you are using Apple silicone (M1-based-mac).
=======
    It's recommended that you read the output of this script to ensure everything went smoothly,
    particularly if you are using Apple silicone (M1-based-mac).
>>>>>>> e88d6c7 (small edits)


The following items are required in order for this template to work:


* `node <https://nodejs.org/en/download/>`_:
   * `npm <https://docs.npmjs.com/downloading-and-installing-node-js-and-npm>`_

* `python3 <https://www.python.org/downloads/>`_,
    * `pyenv <https://github.com/pyenv/pyenv>`_ is recommended to manage versions:
    * `cookiecutter <https://cookiecutter.readthedocs.io/en/1.7.2/installation.html>`_

* `postgres <https://www.postgresql.org/download/>`_

*  bash (`WSL2 <https://docs.microsoft.com/en-us/windows/wsl/install-win10>`_ or `Cygwin <https://cygwin.com/install.html>`_ recommended for windows users)
* `poetry <https://python-poetry.org/docs/>`_ virtual environment/package manager (python 3.10+ is required)
* `direnv <https://direnv.net/docs/installation.html>`_ handles activating your virtual env when you enter the project directory


Project Dependencies
--------------------

Hydra

python = "^3.10"
Django = {extras = ["argon2"], version = "^4.0.4"}
whitenoise = {extras = ["brotli"], version = "^5.3.0"}
django-allauth = "^0.47.0"
django-htmx = "^1.8.0"
`django-annoying <https://github.com/skorokithakis/django-annoying>`_:
django-environ = "^0.8.1"
django-extensions = "^3.1.5"
django-model-utils = "^4.2.0"
psycopg2-binary = "^2.9.3"
boto3 = "^1.20.46"
django-storages = "^1.12.3"
uvicorn = "^0.17.1"
gunicorn = "^20.1.0"
sentry-sdk = "^1.5.4"
Pillow = "^9.0.0"
django-anymail = {extras = ["sendgrid"], version = "^8.5"}
django-vite = "^1.3.0"
tblib = "^1.7.0"
django-cachalot = "^2.5.0"
redis = "^4.1.2"
hiredis = "^2.0.0"
django-redis = "^5.2.0"
django-jinja = "^2.10.2"
heroicons = {extras = ["jinja"], version = "^1.8.0"}
django-rich = "^1.4.0"


Dev Dependencies
^^^^^^^^^^^^^^^^

Werkzeug = "2.0.2"
coverage = {extras = ["toml"], version = "^6.4.1"}
ipython = "^7.31.1"
ipdb = "^0.13.9"
ptpython = "^3.0.20"
django-debug-toolbar = "^3.2.4"
model-bakery = "^1.4.0"
watchdog = "2.1.6"
honcho = "1.1.0"
unittest-xml-reporting = "^3.2.0"
playwright = "^1.18.2"
pywatchman = "^1.4.1"
icecream = "^2.1.1"
pre-commit = "^2.17.0"
pudb = "^2022.1"
poetryup = "^0.5.1"
importmagic = "^0.1.7"
epc = "^0.0.5"
django-silk = "^5.0.1"
