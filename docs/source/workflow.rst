Contributing to the Template
============================

First, create an instance of the template using cookiecutter. Create changes in the sample app, and commit to git on a new feature branch.

Then go back into the `generic-django-conf` folder and run:

1) `git config --global init.defaultBranch main`. When using this command, `main` should be the name of the primary branch of the instantiated project, not the primary branch of the template.
2) `retrocookie --branch=your-branch-name ../your-project-name`

This will attempt to take the git diff of the prior commit and apply it back to the template.

..note::
    IMPORTANT: When adding new dependencies to a project, always delete the `poetry.lock` file and recreate it before committing, otherwise it won't merge correctly.
    The documentation for retrocookie is here: <https://pypi.org/project/retrocookie/>


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
    * SEO compitbility scrub
    * Accessibility compatibility scrub
