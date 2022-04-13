import importlib
import os
import shutil
import stat
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
NAME = ""


def main():
    print("Setting up a previously created project")

    setup_env()
    setup_python()
    setup_js()
    setup_database()

    print("Omae wa mō shinde iru")

    setup_github()

    manage = Path(ROOT, "manage.py")
    manage.chmod(manage.stat().st_mode | stat.S_IEXEC)
    run_command([sys.executable, "-m", "poetry", "run", "pre-commit", "install"])

    os.unsetenv("DJANGO_SECRET_KEY")

    # TODO: git flow init
    fin = f"Maybe The Real {Path(__file__).name} Was the Friends We Made Along the Way"
    div = "-" * len(fin)
    print(div)
    print(fin)
    print(div)


def setup_env():
    dotenv_file = Path(ROOT, ".env")
    if not dotenv_file.exists():
        shutil.copy(Path(ROOT, ".env.example"), dotenv_file)

    package = "dotenv"
    try:
        importlib.import_module(package)
    except (ImportError, ModuleNotFoundError):
        run_command([sys.executable, "-m", "pip", "install", "python-dotenv"])

    importlib.import_module(package).load_dotenv()

    global NAME
    NAME = os.environ["ENV_NAME"]


def setup_python():
    if shutil.which("poetry") is None:
        run_command([sys.executable, "-m", "pip", "install", "poetry"])

    run_command("poetry install", shell=True)


def setup_js():
    run_command("npm install", shell=True)


def setup_database():
    result = run_command(["psql", "-l"], output=False)

    if not any(NAME in i for i in result):
        print("Creating database")
        commands = [
            f"create role {NAME} with createdb encrypted password '{NAME}' login;",
            f"alter user {NAME} superuser;",
            f"create database {NAME} with owner {NAME};",
        ]
        for command in commands:
            run_command(["psql", "-c", command])
    else:
        print("Database exists")


def setup_github(first_time=False):
    if Path(ROOT, ".git").exists():
        print("Git exists")

    else:
        print("Setting up Git")
        run_command(["git", "init", ".", "-b", "main"])
        run_command(
            ["git", "remote", "add", "origin", f"git@github.com:Lightmatter/{NAME}.git"]
        )

    if first_time:
        print("Setting up the git repo for the first time")
        run_command(["git", "add", "."])
        run_command(["git", "commit", "-am", "initial commit", "-q"])
        print("Added everything and committed initially")


def run_command(command, output=True, *args, **kwargs):
    process = subprocess.Popen(
        command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, *args, **kwargs
    )

    result = []

    while True:
        returncode = process.poll()

        line = process.stdout.readline().decode().strip()
        result.append(line)

        if output:
            print(line)

        if returncode is not None:
            if returncode != 0:
                raise OSError(f"Command {command} failed with return code {returncode}")

            break

    return result


if __name__ == "__main__":
    main()
