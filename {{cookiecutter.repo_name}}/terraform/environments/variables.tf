variable "aws_profile" {
  default = "default"
}
variable "aws_region" {
  default = "us-east-1"
}
variable "heroku_team" {
  description = "Name of the Team (must already exist)"
  default ="lightmatter"
}
variable "app_name" {
  description = "base name of the application"
  default = "{{cookiecutter.repo_name}}"
}
variable "SENTRY_AUTH_TOKEN" {
  description = "sentry_auth_token"
}
