Local Development & Debugging
==============================

Running the local development servers
--------------------------------------

This app uses webpack to compile/transpile assets. The app is equipped to be served from `127.0.0.1:8000` or `localhost:8000`.

First run the python server:

.. code-block:: console

    ./manage.py runserver_plus

Then in a new tab, run the vite server:

.. code-block:: console

    npm run dev

Debugging
----------

To access a python shell pre-populated with Django models and local env:

.. code-block:: console

    ./manage.py shell_plus

To add a breakpoint in your python code, add the following code to your `.bashrc` or `.zshrc`:

.. code-block:: console

    export PYTHONBREAKPOINT="pudb.set_trace"

Then add the following to your python code:

.. code-block:: python

    breakpoint()

If the above fails or you prefer a more immediate solution, you can add the following to your code:

.. code-block:: python

    import pudb; pu.db

For ease of local development, `icecream <https://github.com/gruns/icecream>`_ is preconfigured and ready to use.

Logging
-------
