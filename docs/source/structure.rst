Project Structure
==============================

Backend
-------


Frontend
--------

Vite.js
*******
Vite bundles the frontend libraries and frameworks, as well as handling for static assets. 

Configuration of Vite is explored in more detail in the Compiling and Deployment section

Jinja Templates
***************

For templating, the `Link Jinja <https://jinja.palletsprojects.com/en/3.0.x/>` engine is recommended. 

The environment setup:

base.py: Include django_jinja backend templates in base.py along with Django Templates
{
        # https://niwi.nz/django-jinja/latest/
        "BACKEND": "django_jinja.backend.Jinja2",
        "DIRS": [root("templates")],
        "APP_DIRS": True,
        "OPTIONS": options,
    },

jinja2.py file: For ease of use and configuration, it's recommended to compose a `jinja2.py` file to compose the Environment options directly.
This file should be composed of a parent dictionary with globals, filters, et al. defined on that dictionary.

to incorporate extensions:



Tailwind CSS
************

`Link Tailwind CSS <https://tailwindcss.com/>` is a framework that allows developers to compose CSS directly into the class attribute
of HTML elements. 

One important thing to note is that Tailwind does have a default color palette that can be referenced `Link here <https://tailwindcss.com/docs/customizing-colors>`

For instructions on customizing (or extending) the color palette, see the instructions in the link above.


Components
----------


Forms
-----

