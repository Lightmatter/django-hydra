variable "environment"{
  type = string
  default = "development"
}
variable "app_name" {
  type = string
  default = "{{cookiecutter.repo_name}}"
}
variable "aws_storage_bucket_name" {
  type = string
}

variable "iam_access_key" {
  type = string
}

variable "iam_secret_key" {
  type = string
}
variable "cloudfront_url" {
  type = string
}
variable "heroku_team" {
  type = string
}
data "heroku_team" "team" {
  name = var.heroku_team
}

resource "heroku_app" "app" {
  name   = "${var.app_name}-${var.environment}"
  region = "us"
  stack = "container"
  config_vars = {
    API_BASE_URL = ""
    AWS_STORAGE_BUCKET_NAME = var.aws_storage_bucket_name
    AWS_ACCESS_KEY_ID = var.iam_access_key
    SENTRY_DSN = ""
    DJANGO_SETTINGS_MODULE = "{{cookiecutter.repo_name}}.{{cookiecutter.repo_name}}.settings.heroku"
    ALLOWED_HOSTS = "${var.app_name}-${var.environment}.herokuapp.com"
    AWS_S3_CUSTOM_DOMAIN = var.cloudfront_url
  }
  sensitive_config_vars = {
    AWS_SECRET_ACCESS_KEY = var.iam_secret_key
    SECRET_KEY = "changeme"
  }
  organization  {
    name = var.heroku_team
  }
}

resource "heroku_addon" "database" {
  app  = heroku_app.app.name
  plan = "heroku-postgresql:standard-0"
}
resource "heroku_addon" "cache" {
  app  = heroku_app.app.name
  plan = "heroku-redis:hobby-dev"
}

resource "heroku_addon" "mail" {
  app  = heroku_app.app.name
  plan = "mailgun"
}

output "heroku_app_name" {
  value = heroku_app.app.name
}
