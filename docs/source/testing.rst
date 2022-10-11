Testing
========

Testing the Template
---------------------

To ensure that your template is working, you can run the :code:`test.sh` script.
The :code:`test.sh` will do a run of the template, and then run the django tests and `prospector <https://pypi.org/project/prospector/>`_ against it.

.. code-block:: console

    test.sh keepenv

.. note::
    If you do not pass the argument keepenv, it will delete the old virtualenvironment. If you want to do this, simply run:

    .. code-block:: console

        test.sh

Testing/Validation within your Project
---------------------------------------

This will be run automatically when you attempt to commit code but if you want to manually validate/fix your code syntax during development you can run:

.. code-block:: console

    poetry run pre-commit run --all-files

This project uses the `pytest <https://docs.pytest.org/>`_ framework with `pytest-django <https://pytest-django.readthedocs.io/en/latest/>`_ enabling Django tests and `pytest-playwright <https://playwright.dev/python/docs/test-runners>`_ for end-to-end testing. This replaces the default Django tests using unittest.

Django tests can be run by running:

.. code-block:: console

    pytest

While pytest is backwards-compatible with unittest, there are some key differences that implementers need to understand. If you're new to pytest in Django or playwright testing, reviewing the documentation for these libraries is well worth the time.
