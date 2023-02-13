Contributing to the Template
============================


1. Ensure git is configured globally to use ``main`` as the default branch name.

    .. code-block:: console

        $ git config --global init.defaultBranch main


2. Follow the steps in :ref:`setup` to create a new project.

3. Make your changes in this new project, then commit to git on a new feature branch.

4. From this project's directory (default ``django-hydra``) run retrocookie.

    This will attempt to take the git diff of the prior commit and apply it back to the template.

    .. code-block:: console

        $ poetry shell # enter the poetry virtual env first
        $ retrocookie --branch=your-branch-name ../your-project-name


    .. warning::

        When adding new dependencies to a project, always delete the `poetry.lock` file and recreate it before committing, otherwise it won't merge correctly.

        Additionally, retrocookie does not currently support ignoring jinja syntax. Therefore you will need to manually backport any changes to jinja templates.

        The documentation for retrocookie is here: https://pypi.org/project/retrocookie/


Upcoming Features
=================

Things we still want to do

* caching everything possible (middleware for sure)
* user useradmin
* django-secure
* django robots
* user feedback
* add django password validators
* Front end updates
    * SEO compatibility scrub
    * Accessibility compatibility scrub
