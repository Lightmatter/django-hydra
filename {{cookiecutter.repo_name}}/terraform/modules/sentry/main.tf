variable "organization"{
  type = string
  default = "lightmatter"
}
variable "app_name" {
  type = string
  default = "{{cookiecutter.repo_name}}"
}
variable "team_name" {
  type = string
  default = "{{cookiecutter.repo_name}}"
}
variable "slack_workspace_id" {
  type = string
  default = "37408"
}

# Create a team
resource "sentry_team" "default" {
  organization = var.organization
  name = var.team_name
  slug = var.team_name
}

# Create a project
resource "sentry_project" "default" {
  depends_on = [sentry_team.default]
  organization = var.organization
  team     = var.team_name
  name     = var.app_name
  slug     = var.app_name
}

# Create a key
resource "sentry_key" "default" {
  depends_on = [sentry_project.default]
  organization = var.organization
  project = var.app_name
  name = "${var.app_name} Key"
}


# Create a plugin
resource "sentry_rule" "default" {
  depends_on = [sentry_project.default]
  organization = var.organization
  project = var.app_name
  name = "Send a notification for new events"
  frequency    = 30

  conditions =   [
    {
      id = "sentry.rules.conditions.first_seen_event.FirstSeenEventCondition"
    }
  ]

  actions =  [
    {
      name = "Send a notification to the Lightmatter Slack workspace to #${var.app_name}-internal and show tags [] in notification"
      workspace = var.slack_workspace_id
      tags = "environment"
      id = "sentry.integrations.slack.notify_action.SlackNotifyServiceAction"
      channel = "#${var.app_name}-internal"
    }
  ]
}

output "sentry_dsn" {
  value = sentry_key.default.dsn_public
}
