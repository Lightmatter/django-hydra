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

Vite must be made aware of all of the frontend assets in order to properly bundle and run them.

To start, it's worth noting that Vite supports both typescript and javascript files out of the box, so there's flexibility for you to
build how you see fit.

When you're ready to import your .js or .ts files into Vite, you'll need an entrypoint.
In the ``vite.config.js`` file, there is a single input in ``rollupOptions`` named ``main``.
This is set to the ``main.ts`` file in the frontend directory, and that file serves as the central entrypoint for all of the assets Vite will bundle.

In the main.ts file, Alpine.js and htmx have already been imported, but any additional frontend packages/frameworks should be imported using
similar methods.

You'll also see references to the javascript or typescript files that pertain to specific components and their behavior, like modals. Any custom javascript you
write for components should similarly be imported here.

CSS
***
With the frontend frameworks and assorted scripts added to the ``main.ts`` file, the remaining CSS is rolled into the ``tailwind.css`` file.

For additional CSS, that should be imported into the ``tailwind.css`` file along with the the imports from tailwind's base.


Static Location and Manifest
****************************
The ``npm build`` will automatically export a manifest.json file with all the sundry entrypoints and dependencies.

However, you should run ``collect static`` to ensure that the handling of static assets is handled properly.

Whitenoise and Caching
**********************

Whitenoise is used to serve static files over Django's handling of static assets, and used for HTTP caching

As discussed in the `django_vite <https://github.com/MrBin99/django-vite/blob/master/README.md#notes>`_ documentation,
There is a custom test that is required to amend Vite's behavior to accomodate whitenoise serving static assets.
For more details about the implementation, see `this guide <http://whitenoise.evans.io/en/stable/django.html#WHITENOISE_IMMUTABLE_FILE_TEST>`_.


Deployment Process and Optimizations
-------------

There are configuration files for `render.com <https://render.com/>`_ and `fly.io <https://fly.io/>`_.

The render file sets up the following services:
* a Django webserver with a prebuilt/precompiled front end
* a Minio service that manages media asset storage on AWS S3
* a redis service
* a PostgreSQL database


Built-In CDN
************
https://fly.io/docs/reference/configuration/#the-statics-sections
