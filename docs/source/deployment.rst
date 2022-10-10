Compiling and Deployment
===========

Automatic Actions
-----------------

This will be run automatically when you attempt to commit code but if you want to manually validate/fix your code syntax during development you can run:

.. code-block:: console

    poetry run pre-commit run --all-files

This app is set up to use circleci, but could be extended to any build process. Circle will automatically run:

.. code-block:: console

    poetry run pre-commit run --all-files
    poetry run playwright install
    poetry run coverage run --source='.' manage.py test


Compiling Process
-----------------

Vite and Entry Points
*********************

- vite.config.js: ENTRYPOINTS: every js file that can be imported into html files (currently main.ts)

CSS and TypeScript
******************
- import CSS through JS file and then put in through Vite entrypoint

Static Location and Manifest
****************************
- Npm build exports manifest.json file w/ entrypoints and dependencies

- run collect static (django functionality to move files where they need to go)

Whitenoise and Caching
**********************
- Handling asset/http caching
- Max age


Deployment Process and Optimizations
-------------

There are configuration files for `render.com <https://render.com/>`_ and `fly.io <https://fly.io/>`_

Built-In CDN
************
https://fly.io/docs/reference/configuration/#the-statics-sections

Redis
*****


Cachealot
*********
