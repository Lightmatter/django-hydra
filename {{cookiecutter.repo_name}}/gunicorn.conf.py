import multiprocessing

accesslog = "-"
bind = "0.0.0.0:8080"
preload_app = True
worker_class = "uvicorn.workers.UvicornWorker"
# See https://docs.gunicorn.org/en/stable/design.html#how-many-workers
workers = multiprocessing.cpu_count() * 2 + 1
wsgi_app = "{{cookiecutter.repo_name}}.config.asgi:application"
