.. _setup:

Setting Up a Hydra Project
==========================

There are two main scripts that you need to know about in this template, :code:`create_new_project.sh` and :code:`setup_existing_project.sh`.
These both do pretty much what they say, however here is an expanded list of what each will do when run:

* Create a poetry/direnv virtual environment
* install python and js requirements (dev and regular) via poetry and npm (or optionally yarn)
* Create a database
* Run the django migrations
* Setup git

Follow the below guide to set up a new project or get started on an existing one.

.. note::

    If you're getting set up on an existing project, skip to step 4b.

1. Clone the template

    .. code-block:: console

        $ git clone https://github.com/Lightmatter/django-hydra.git


2. Use cookiecutter to create a new version of the project.

    .. warning::

        This command should be run from this project's parent directory.


    .. code-block:: console

        $ cookiecutter django-hydra

    Cookiecutter will ask you some questions about which integrations you might want.


3. Navigate into the project directory that you just created

    .. code-block:: console

        $ cd <project_name>

4. Set up the project

    a. For a new project:

    .. code-block:: console

        $ ./scripts/create_new_project.sh


    b. For an existing project

    .. code-block:: console

        $ ./scripts/setup_existing_project.sh


5. Run Django server with runserver_plus

    .. code-block:: console

        $ ./manage.py runserver_plus

6. In a new shell tab/window navigate to the project directory and run the vite server

    .. code-block:: console

        $ npm run dev

6. View the project in your browser

    Open your preferred browser to http://127.0.0.1:8000/ or http://localhost:8000


Configuring environment variables
==================================

Before you may develop on the app itself you will need a ``.env`` file.

Provided in the template is a ``.env.example`` which can be copy and pasted into a new ``.env`` file if setting up the project manually.

This template leverages this file using the dotenv JavaScript library as part of Vite.

.. note::

    When following the steps above, the ``.env.example`` will be copied to new instance under ``.env`` automatically by the respective setup script.

Accessing Environment Variables in Python
------------------------------------------

Environment vars are available in all settings file, more details `here <https://django-environ.readthedocs.io/en/latest/index.html>`_

Accessing Environment Variables in JavaScript/TypeScript
---------------------------------------------------------

Environment vars prefixed with ``VITE_`` are available in all .js files and html script tags
using the special ``import.meta.env`` object.

This can be used like so:

.. code-block:: js

    import.meta.env.VARIABLE_NAME // note the removal of the `VITE_` prefix

`more details here <https://vitejs.dev/guide/env-and-mode.html>`_

Installing
===========

The ``setup_existing_project.sh`` and the ``create_new_project.sh`` scripts will automatically install both the JavaScript and the Python dependencies, however if you need to install them yourself manually at a later date, you can run the below commands independently to do that.

Install JavaScript dependencies
--------------------------------

.. code-block:: console

    $ npm install

Install Python Dependencies
----------------------------

.. code-block:: console

    $ ./scripts/setup_python.sh

.. note::
    Once that's been run the first time you can just run:

    .. code-block:: console

        $ poetry install
