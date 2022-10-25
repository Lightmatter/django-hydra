Deployment
===========

This will be run automatically when you attempt to commit code but if you want to manually validate/fix your code syntax during development you can run:

.. code-block:: console

    poetry run pre-commit run --all-files

This app is set up to use circleci, but could be extended to any build process. Circle will automatically run:

.. code-block:: console

    poetry run pre-commit run --all-files
    poetry run playwright install
    poetry run coverage run --source='.' -m pytest
