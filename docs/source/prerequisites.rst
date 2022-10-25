Prerequisites
==============

The following items are required in order for this template to work.

.. note::
   There are scripts to install what you need for mac based operating systems automatically.

Dependencies
-------------

* `node <https://nodejs.org/en/download/>`_:

   * `npm <https://docs.npmjs.com/downloading-and-installing-node-js-and-npm>`_
   * `yarn <https://classic.yarnpkg.com/en/docs/install/>`_
   * `webpack <https://webpack.js.org/guides/installation/>`_

* `python3 <https://www.python.org/downloads/>`_, although `pyenv <https://github.com/pyenv/pyenv>`_ is recommended to manage versions:

   * `cookiecutter <https://cookiecutter.readthedocs.io/en/1.7.2/installation.html>`_

* `git <https://git-scm.com/downloads>`_
*  bash (`WSL2 <https://docs.microsoft.com/en-us/windows/wsl/install-win10>`_ or `Cygwin <https://cygwin.com/install.html>`_ recommended for windows users)
* `postgres <https://www.postgresql.org/download/>`_
* `terraform <https://www.terraform.io/>`_ Used with Heroku for our CI
* `poetry <https://python-poetry.org/docs/>`_ virtual environment/package manager
* `direnv <https://direnv.net/docs/installation.html>`_ handles activating your virtual env when you enter the project directory

Environment Configuration
--------------------------

There is also a certain amount of environmental configuration that must be done in order for the above dependencies and the below template to work.

.. note::
    If you have a setup guide/a setup process that works for windows or a particular linux distro, please add it below for the benefit of future developers. If you use a specific, non-standard shell (not bash or zsh or similar), please call that out in your instructions as well.

macOS
*************

To install on a mac based operating system, you can use the install script to setup everything.

Run the following script block to get setup:

.. code-block:: console

    git clone git@github.com:Lightmatter/django-hydra.git
    ./django-hydra/scripts/mac_intel_install.sh

It's recommended that you read the output of this script to ensure everything went smoothly,
particularly if you are using Apple silicone (M1-based-mac).

Windows
*************

Dependencies
``````````````

* You will need to install Poetry (which requires python 3.10 or greater at the moment), :code:`(Invoke-WebRequest -Uri https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py -UseBasicParsing).Content | python3 -` n.b. if you are using a bash shell, you should run the version of this command in the macOS section above

    * In order for poetry to run on the correct python version, you will want to make sure that python3 resolves to python 3.10 in your shell

Not macOS (including Windows)
******************************

Dependencies
`````````````
* You will need to install direnv, platform specific installation instructions are available `here <https://direnv.net/docs/installation.html>`_

Before you create any projects with this template
--------------------------------------------------

* Ensure that your git is properly setup with your username and email in order for the initial commit to have the correct log.
* Project names must be composed of lowercase alphanumeric characters only, with no spaces or special characters.
