Project Structure
==============================

This project is divided into 2 major parts: Alpine.js to provide additional front end functionality and a Django backend.

* `/frontend`- The Alpine.js project root, contains static assets (such as CSS and TypeScript) that will be served by Vite
* `/{{ cookiecutter.project_name }}` - the Django project folder
* `/config` - Project settings, asgi settings, and base urls
* `/home` - Handles home page for django, error endpoint, settings context processor
* `/user` - User related logic, views, models, etc.
* `/wagtailapp` - If wagtail was used via the cookiecutter setup script, this is where wagtail models, views, etc. are created
* `/util` - Container for general utility classes, functions, etc.
* `/static_source` - for adding assetsthat will be served via python
* `/templates` - html/htmx templates for all webpages served by the app


Backend
-------

Hydra relies on much of Django's default tooling with some packages added on to allow for extensibility and ease of use, including
    * `django-annoying <https://github.com/skorokithakis/django-annoying>`_
    * `django-extensions <https://github.com/django-extensions/django-extensions>`_
    * `django-model-utils <https://github.com/jazzband/django-model-utils>`_

For a complete list of the dependencies used and the purpose for their inclusion, check :ref:`dependency-list`


Frontend
--------

Vite.js
*******
Hydra uses Vite to bundle the frontend libraries and frameworks, as well as handling for static assets.

Vite leverages the fact that modern browsers support module imports natively, meaning that when files are served
the browser makes the HTTP requests for each import and then the dev server receives the browser's HTTP requests and
makes any changes by hotswapping code.

The hotswapping support for Hydra's Jinja templates are handled by `django-vite <https://github.com/MrBin99/django-vite>`_,
specifically the `vite_hmr_client tag <https://github.com/MrBin99/django-vite#template-tags>`_.

Configuration of Vite is explored in more detail in the Compiling and Deployment section

Templates
*********
Jinja templating provides powerful, but easy to implement methods for

Jinja template inheritance functions very similarly to `Django's templates <https://docs.djangoproject.com/en/4.0/ref/templates/language/>`_.
Just like Django templates, you can extend a template and have the child template inherit from the base or parent template, and overwrite blocks of
content.

Jinja `macros <https://jinja.palletsprojects.com/en/3.1.x/templates/#macros>`_ are a powerful way to reduce code and template specific components for reuse.
They can be thought of as functions that return customized templates based off of whatever arguments are passed to them. By default,

Alpine JS and HTMX
^^^^^^^^^^^^^^^^^^
    - Alpine allows for inline javascript

    - Alpine globals scope

    - HTMX for server requests

Tailwind CSS
^^^^^^^^^^^^

`Tailwind CSS <https://tailwindcss.com/>`_ is a framework that allows developers to compose CSS directly into the class attribute
of HTML elements.

One important thing to note is that Tailwind does have a default color palette that can be referenced `here <https://tailwindcss.com/docs/customizing-colors>`_

For instructions on customizing (or extending) the color palette, see the instructions in the link above.

- One important thing to note is that dynamic generation of tailwind classes can be tricky and not show up

- Workarounds for that


Components
----------

All generic Jinja components are under the `{{cookiecutter.repo_name}}/templates/components/` directory. The structure follows the
material.ui format of having a folder per component with the js/css/jinja files within, allowing for files to be overwritten and customized
as needed.

To create a macro, they must first be defined, and examples


Forms
-----

It's important to note that the widgets that django typically provides are overwritten in Hydra. Rather than working directly with the Django widgets as they as written,
the Jinja templates for widgets are imported as the defaults. Due to how Django requires that the component templates are overwritten by shadowed methods,
you'll see several examples of this under the `templates/django/forms/widgets/` directory.

Custom form widgets can be composed using Jinja
