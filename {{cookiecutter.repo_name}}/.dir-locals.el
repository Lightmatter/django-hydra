((python-mode . (
                    (python-shell-interpreter . "python")
                    (pyvenv-workon . "{{cookiecutter.repo_name}}")
                    (eval . (progn
                                (setq
                                    python-shell-process-environment  (list "DJANGO_SETTINGS_MODULE={{cookiecutter.repo_name}}.{{cookiecutter.repo_name}}.settings.local")
                                    python-shell-extra-pythonpaths (list (expand-file-name (locate-dominating-file default-directory dir-locals-file)))
                                    python-shell-interpreter-args (concat "-i " (expand-file-name (locate-dominating-file default-directory dir-locals-file)) "manage.py shell_plus --plain")))))))
