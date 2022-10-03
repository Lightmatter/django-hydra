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

CSS and TypeScript
******************

Static Location and Manifest
****************************

Whitenoise and Caching
**********************



Deployment Process and Optimizations
-------------

There are configuration files for `Link render.com <https://render.com/>` and `Link fly.io <https://fly.io/>`

Built-In CDN
************
Fly.io has a built-in CDN available `Link here <https://www.npmjs.com/package/@fly/cdn/v/0.4.0-0>`

Redis
*****

Cachealot
*********
