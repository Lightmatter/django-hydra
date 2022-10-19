import subprocess


def test_no_migrations():
    proc = subprocess.run(
        ["poetry", "run", "python", "manage.py", "makemigrations", "--check", "--dry-run"]
    )

    assert proc.returncode == 0
