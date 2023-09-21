import re
import sys

MODULE_REGEX = r"^[a-z][_a-z]+$"

module_name = "{{ cookiecutter.repo_name }}"

if not re.match(MODULE_REGEX, module_name):
    print(
        "ERROR: %s is not a valid project name! Must be lower case, a-z and _ "
        % module_name
    )

    # exits with status 1 to indicate failure
    sys.exit(1)
