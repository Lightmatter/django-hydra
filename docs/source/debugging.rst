Local Development & Debugging
==============================

Running the local development servers
--------------------------------------

This app uses vite to compile/transpile assets. The app is equipped to be served from `127.0.0.1:8000` or `localhost:8000`.

First run the python server:

.. code-block:: console

    $ ./manage.py runserver_plus

Then in a new tab, run the vite server:

.. code-block:: console

    $ npm run dev

Debugging
----------

To access a python shell pre-populated with Django models and local env:

.. code-block:: console

    $ ./manage.py shell_plus

To add a breakpoint in your python code, add the following code to your `.bashrc` or `.zshrc`:

.. code-block:: console

    $ export PYTHONBREAKPOINT="pudb.set_trace"

Then add the following to your python code:

.. code-block:: python

    breakpoint()

If the above fails or you prefer a more immediate solution, you can add the following to your code:

.. code-block:: python

    import pudb; pu.db

As an alternative to pudb and its debugger, this project also has the IPython debugger (ipdb). You can access ipdb by adding the following to your code:

.. code-block:: python

    import ipdb;
    ipdb.set_trace()

For ease of local development, `icecream <https://github.com/gruns/icecream>`_ is preconfigured and ready to use.

Logging
-------

Logging is configured in the base.py settings. To use the logger in your backend code you can add the following:

.. code-block:: python

    import logging

    logger = logging.getLogger(__name__)

    logger.info("this is an info level log")
