Hydra Cookbook
==============

Components
----------

Hydra uses the Jinja template language for its html templates (``.jinja`` files).

Jinja provides a control structure called macros that are comparable with functions and are used
by Hydra to create frontend components.

An example of a macro/component definition is below:

.. code-block:: html+django
    :caption: templates/components/link.jinja

    {% macro link(url, text='', target='') %}
        <a href="{{ url }}"
        target="{{ target }}"
        class="text-blue-500; hover:text-blue-700; underline">{{ text }}</a>
    {% endmacro %}


To use this macro elsewhere in the project, you would call it like so:

.. code-block:: html+django

    {{ link(url="https://www.example.com", target="_blank", text="example website") }}


For more information on Jinja macros `see here <https://jinja.palletsprojects.com/en/3.1.x/templates/#macros>`__.


Forms
-----

Hydra makes it easy to customize Django forms to suit your needs.

Custom Layouts
**************

When including a form in a template, you can customize the layout of the form
as rendered in the template by creating another template file with ``_form`` appended to the
name of the parent template (e.g. for ``login.jinja``, the form template is ``login_form.jinja``).

In this form template you can adjust what django widgets are used for each field within the form.
For example:

.. code-block:: html+django
    :caption: templates/account/login_form.jinja

    {% from 'forms/field.jinja' import field as f %}
    {% from 'forms/checkbox.jinja' import checkbox %}
    <div class="form-wrapper justify-between">
        {{ errors }}
        {% for field, errors in fields %}
            {% if field.name == 'remember' %}
                {{ checkbox(field) }}  {# remember should be a checkbox macro #}
            {% else %}
                {{ f(field, errors) }}  {# any other field should use Hydra's field macro #}
            {% endif %}
        {% endfor %}
        <a href="{{ url("account_reset_password") }}"
        hx-select='#account-box'
        class="link">Forgot your password?</a>
        {% for field in hidden_fields %}{{ field }}{% endfor %}
    </div>


For more information about looping through form fields `see here <https://docs.djangoproject.com/en/4.1/topics/forms/#looping-over-the-form-s-fields>`__.

Django Widget to Jinja Macro
****************************

Hydra creates several mappings from Django's built in form widgets to its own, custom jinja macros
through template overrides within ``templates/django/forms/widgets`` which are mapped to macros
within ``templates/forms``.

You can also extend these mappings as necessary in your own project.
An example of how to do is shown below using the input widget.

Example
^^^^^^^

The jinja macro is defined in ``templates/forms``

.. code-block:: html+django
    :caption: templates/forms/input.jinja

    {% from 'components/util.jinja' import attributes %} {# helper macro for html attributes #}

    {% macro input(type="text", name=none, value=none, model="input", color='primary', attrs={}, left_icon='', right_icon='') %}
        {% set disabled, readonly = attrs.disabled, attrs.readonly %}
        {% set noedit = disabled or readonly %}
        <input
            {% set _ = attrs.update({"type": type, "name": name, "value": value}) %}
            {{ attributes(attrs) }}
        />
    {% endmacro %}

    {# takes a django widget and calls our input macro with the appropriate args #}
    {% macro widget_to_input(widget) %}
        {{ input(type=widget.type, name=widget.name, value=widget.value, model=widget.attrs.id, attrs=widget.attrs )}}
    {% endmacro %}


An html template for the widget to be overridden is added to ``templates/django/forms/widgets``

.. code-block:: html+django
    :caption: templates/django/forms/widgets/input.html

    {% from 'forms/input.jinja' import widget_to_input %}

    {{ widget_to_input(widget) }}
