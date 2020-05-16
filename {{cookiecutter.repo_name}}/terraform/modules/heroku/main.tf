resource "random_string" "random" {
  length = 50
}

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
variable "sentry_dsn" {
  type = string
}
variable "sentry_org" {
  type = string
}
variable "sentry_project" {
  type = string
}
variable "sentry_auth_token" {
  type = string
}
//TODO: Set database plan to be controlable so that we spin dev up with a free one
resource "heroku_app" "app" {
  name   = "${var.app_name}-${var.environment}"
  region = "us"
  stack = "container"
  config_vars = {
    DJANGO_SETTINGS_MODULE = "{{cookiecutter.repo_name}}.{{cookiecutter.repo_name}}.settings.heroku"
    ALLOWED_HOSTS = "${var.app_name}-${var.environment}.herokuapp.com"
    SENTRY_DSN = var.sentry_dsn
    SENTRY_PROJECT = var.sentry_project
    SENTRY_ORG = var.sentry_org
    SENTRY_AUTH_TOKEN = var.sentry_auth_token
    ENVIRONMENT = var.environment
  }
  sensitive_config_vars = {
    SECRET_KEY = random_string.random.result
  }
  organization  {
    name = var.heroku_team
  }
}
resource "heroku_config" "aws" {
  vars = {
    API_BASE_URL = ""
    AWS_STORAGE_BUCKET_NAME = var.aws_storage_bucket_name
    AWS_ACCESS_KEY_ID = var.iam_access_key
    AWS_S3_CUSTOM_DOMAIN = var.cloudfront_url
  }

  sensitive_vars = {
    AWS_SECRET_ACCESS_KEY = var.iam_secret_key
  }
}
resource "heroku_app_config_association" "aws" {
  app_id = heroku_app.app.id
  vars = heroku_config.aws.vars
  sensitive_vars = heroku_config.aws.sensitive_vars
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
