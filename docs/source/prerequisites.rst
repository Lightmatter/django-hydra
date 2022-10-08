Prerequisites & Dependencies
==============

Before you create any projects with this template
--------------------------------------------------

* Ensure that your git is properly setup with your username and email in order for the initial commit to have the correct log.
* Project names must be composed of lowercase alphanumeric characters only, with no spaces or special characters.


Dependencies
-------------
.. note::
   For Mac systems, there is an automatic installation script that handle dependencies for Hydra:

    .. code-block:: console

        git clone git@github.com:Lightmatter/generic-django-conf.git
        ./generic-django-conf/scripts/mac_intel_install.sh

    It's recommended that you read the output of this script to ensure everything went smoothly,
    particularly if you are using Apple silicone (M1-based-mac).


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
