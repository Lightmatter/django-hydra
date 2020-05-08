# Create a team
resource "sentry_team" "default" {
  organization = "my-organization"
  name = "My Team"
  slug = "my-team"
}

# Create a project
resource "sentry_project" "default" {
  organization = "my-organization"
  team     = "my-team"
  name     = "Web App"
  slug     = "web-app"
  platform = "javascript"
}

# Create a plugin
resource "sentry_plugin" "default" {
  organization = "my-organization"
  project = "web-app"
  plugin = "slack"
  config = {
    webhook = "slack://webhook"
  }
}
