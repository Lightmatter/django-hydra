Compiling and Deployment
========================

Automatic Actions
-----------------

This will be run automatically when you attempt to commit code but if you want to manually validate/fix your code syntax during development you can run:

.. code-block:: console

    $ poetry run pre-commit run --all-files

This app is set up to use circleci, but could be extended to any build process. Circle will automatically run:

.. code-block:: console

    $ poetry run pre-commit run --all-files
    $ poetry run playwright install
    $ poetry run coverage run --source='.' -m pytest


Compiling Process
-----------------

Vite and Assets
***************

Vite must be made aware of all of the frontend assets in order to properly bundle and run them.

To start, it's worth noting that Vite supports both typescript and javascript files out of the box, so there's flexibility for you to
build how you see fit.

.. This section will need to be updated when the frontend reorg is merged.

When you're ready to import your .js or .ts files into Vite, you'll need an asset.
In the ``vite.config.js`` file, there are three assets (called inputs in ``rollupOptions``):

* ``main``: set to ``fontend/js/main.ts``, acts as the central entrypoint for all JS/TS assets.
* ``base``: set to ``frontend/css/base.js``, acts as the central entrypoint for all CSS/SCSS assets
  (this is a .js file as vite currently will only build .js files).
* ``raw_tailwind``: set to ``frontend/css/tailwind.js``, this acts as a tailwind-only asset.

In the ``main.ts file``, Alpine.js and htmx have already been imported, but any additional frontend packages/frameworks should be imported using
similar methods.

You'll also see references to the javascript or typescript files that pertain to specific components and their behavior, like modals. Any custom javascript you
write for components should similarly be imported here.

.. _new_vite_assets:
Additional Assets
^^^^^^^^^^^^^^^^^

.. warning::

    Adding additional Vite assets requires a manual build to keep tests from failing.
    To build run:

    .. code-block:: console

        $ npm run build

You can add more Vite assets to your project as needed, simply by adding another input to ``rollupOptions``
as outlined above. Include the new asset in your template in one of two ways:

In ``base.jinja`` you can just include the new asset in the ``<head>`` tag.

.. code-block:: html+django
    :caption: base.jinja

    <head>
        ...
        {{ vite_asset('path/to/asset.ts') }}
        ...
    </head>

In any other template that extends from base, include the asset in the ``extra_head`` block.

.. code-block:: html+django
    :caption: yourtemplate.jinja

    {% block extra_head %}
        {{ vite_asset('path/to/asset.ts') }}
    {% endblock %}


.. note::

    ``path/to/asset.ts`` will be the same as the path for the input in ``vite.config.js`` with
    ``frontend`` stripped from the front of the path.

CSS
***
As noted above, by default all CSS will be bundled into ``css/base.js``, with tailwind also bundled separately
into its own ``css/tailwind.js`` asset.

Additional CSS should be imported into ``base.css``, or if necessary into a new asset as outlined above.
You can use ``base.js`` and ``base.css`` as an a example of how to bundle CSS using Vite.


Static Location and Manifest
****************************
The ``npm build`` will automatically export a manifest.json file with all the sundry entrypoints and dependencies.

However, you should run ``collect static`` to ensure that the handling of static assets is handled properly.

Whitenoise and Caching
**********************

Whitenoise is used to serve static files over Django's handling of static assets, and used for HTTP caching

As discussed in the `django-vite <https://github.com/MrBin99/django-vite/blob/master/README.md#notes>`_ documentation,
there is a custom test that is required to amend Vite's behavior to accommodate Whitenoise serving static assets.
For more details about the implementation, see `this guide <http://whitenoise.evans.io/en/stable/django.html#WHITENOISE_IMMUTABLE_FILE_TEST>`_.


Deployment Process and Optimizations
------------------------------------

There are configuration files for `render.com <https://render.com/>`_ and `fly.io <https://fly.io/>`_.

The render file sets up the following services:

* a Django webserver with a prebuilt/precompiled front end
* a Minio service that manages media asset storage on AWS S3
* a redis service
* a PostgreSQL database


Built-In CDN
************
https://fly.io/docs/reference/configuration/#the-statics-sections
