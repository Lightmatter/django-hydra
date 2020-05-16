provider "aws" {
  profile = var.aws_profile
  region = var.aws_region
}
provider "heroku" {

}
provider "sentry" {
  token = var.SENTRY_TOKEN
}

data "heroku_team" "team" {
  name = var.heroku_team
}



module "dev_aws" {
  source = "../modules/aws"

  environment = "development"
  app_name = "{{cookiecutter.repo_name}}"
}

module "prod_aws" {
  source = "../modules/aws"

  environment = "production"
  app_name = "{{cookiecutter.repo_name}}"
}
module "sentry" {
  source = "../modules/sentry"
}

module "dev_heroku" {
  source = "../modules/heroku"

  environment = "development"
  app_name = "lm-{{cookiecutter.repo_name}}"
  aws_storage_bucket_name = module.dev_aws.aws_storage_bucket_name
  iam_access_key = module.dev_aws.iam_access_key
  iam_secret_key = module.dev_aws.iam_secret_key
  cloudfront_url = module.dev_aws.cloudfront_url
  heroku_team = var.heroku_team
  sentry_dsn = module.sentry.sentry_dsn
  sentry_org = module.sentry.sentry_org
  sentry_project = module.sentry.sentry_project
  sentry_auth_token = var.SENTRY_TOKEN
}

module "prod_heroku" {
  source = "../modules/heroku"

  environment = "production"
  app_name = "lm-{{cookiecutter.repo_name}}"
  aws_storage_bucket_name = module.prod_aws.aws_storage_bucket_name
  iam_access_key = module.prod_aws.iam_access_key
  iam_secret_key = module.prod_aws.iam_secret_key
  cloudfront_url = module.prod_aws.cloudfront_url
  heroku_team = var.heroku_team
  sentry_dsn = module.sentry.sentry_dsn
  sentry_org = module.sentry.sentry_org
  sentry_project = module.sentry.sentry_project
  sentry_auth_token = var.SENTRY_TOKEN
}





#missing env variables:
# sentry dns

resource "heroku_pipeline" "app" {
  name = var.app_name

  owner {
    id = data.heroku_team.team.id
    type = "team"
  }
}
resource "heroku_pipeline_coupling" "development" {
  app      = module.dev_heroku.heroku_app_name
  pipeline = heroku_pipeline.app.id
  stage    = "development"
}

resource "heroku_pipeline_coupling" "production" {
  app      = module.prod_heroku.heroku_app_name
  pipeline = heroku_pipeline.app.id
  stage    = "production"
}


//TODO: Set up another cloudfront distro for the static assets for the heroku app (not just media)
