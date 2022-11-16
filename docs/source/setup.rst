Setting Up a Hydra Project
==========================

There are two main scripts that you need to know about in this template, :code:`create_new_project.sh` and :code:`setup_existing_project.sh`.
These both do pretty much what they say, however here is an expanded list of what each will do when run:

* Create a poetry/direnv virtual environment
* install python and js requirements (dev and regular) via poetry and npm (or optionally yarn)
* Create a database
* Run the django migrations
* Setup git

You should now follow the below guide depending on whether you are setting up a new project entirely, or getting spun up on a new one.

If you are setting up a new project from scratch
-------------------------------------------------

Run the below commands in order:

The recommended start pattern is described below. The create_new_project.sh command will:

* Create a poetry/direnv virtual environment
* install python and js requirements (dev and regular) via poetry and npm (or optionally yarn)
* create a database
* run the migrations
* and setup git

1. Clone the template

.. code-block:: console

    git clone https://github.com/Lightmatter/django-hydra

    * at the moment you will also want to do the following before running step 2:

.. code-block:: console

    cd django-hydra
    git checkout 3.0
    cd ..

2. Use cookiecutter to create a new version of the project. It will ask you some questions about which integrations you might want. Once you've answered all the questions/prompts, the project creation script (create_new_project.sh) will be run automatically by cookiecutter and should install all dependencies and run all necessary setup. If the new project is created but the creation script fails, you can run `./scripts/create_new_project.sh` from within the new project directory.

.. code-block:: console

    cookiecutter django-hydra

.. note::

    This command should be run from the directory containing/directly above the django-hydra directory

3. Navigate into the project directory that you just created

.. code-block:: console

    cd <project_name>

4. Run Django server with runserver_plus

.. code-block:: console

    ./manage.py runserver_plus

4. In a new shell tab/window navigate to the project directory and run the vite server

.. code-block:: console

    npm run dev

5. You will now be able to view the project at http://127.0.0.1:8000/ or http://localhost:8000

If you are settiing up a project that someone else created
-----------------------------------------------------------

Run the below commands in order:

The recommended start pattern is described below. The setup_existing_project.sh command will:

* install python and js requirements (dev and regular) via poetry and (or optionally yarn)
* create a database
* run the migrations
* and setup git

1. Grant permissions to the `setup_existing_project.sh`

.. code-block:: console

    chmod +x ./scripts/setup_existing_project.sh

2. Execute the `setup_existing_project` script

.. code-block:: console

    ./scripts/setup_existing_project.sh

3. Run Django server with runserver_plus

.. code-block:: console

    ./manage.py runserver_plus

4. In a new shell tab/window navigate to the project directory and run the vite server with npn run dev

.. code-block:: console

    npm run dev

5. You will now be able to view the project at http://127.0.0.1:8000/ or http://localhost:8000


Configuring environment variables
==================================

Before you may develop on the app itself you will need a ``.env`` file. Provided in the template is a ``.env.example`` which can be copy and pasted into a new .env file. It is worth noting that when a new project is created via ``create_new_project.sh``, the ``.env.example`` will be copied to new instance under ``.env``. This template leverages this file using the dotenv JavaScript library as part of Vite.

Accessing Environment Variables in Python
------------------------------------------

Env vars are available in all settings file, more details `here <https://django-environ.readthedocs.io/en/latest/index.html>`_

Accessing Environment Variables in JavaScript/TypeScript
---------------------------------------------------------

Env vars are available in all .js files and html script tags using the global var import.meta.env.{VARIABLE_NAME}, `more details here <https://vitejs.dev/guide/env-and-mode.html>`_

Installing
===========

The ``setup_existing_project.sh`` and the ``create_new_project.sh`` scripts will automatically install both the JavaScript and the Python dependencies, however if you need to install them yourself manually at a later date, you can run the below commands independently to do that.

Install JavaScript dependencies
--------------------------------

.. code-block:: console

    npm install

Install Python Dependencies
----------------------------

.. code-block:: console

    ./scripts/setup_python.sh

.. note::
    Once that's been run the first time you can just run:

    .. code-block:: console

        poetry install
