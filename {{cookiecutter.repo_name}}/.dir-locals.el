;; Pony mode config for the megacorp project
((nil . ;; This applies these settings regardless of major mode

     ((pony-settings (make-pony-project
                         :python "~/.virtualenvs/{{cookiecutter.repo_name}}/bin/python"
                         :pythonpath "~/.virtualenvs/{{cookiecutter.repo_name}}/lib/"
                         :settings "{{cookiecutter.repo_name}}.{{cookiecutter.repo_name}}.settings.local"
                         :appsdir "{{cookiecutter.repo_name}}")
          ))))
