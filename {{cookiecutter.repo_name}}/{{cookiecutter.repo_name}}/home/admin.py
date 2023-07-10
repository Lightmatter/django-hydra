from allauth.account.models import EmailAddress
from django.contrib.auth.admin import admin
from django.contrib.auth.models import Group
from django.contrib.sites.models import Site
from robots.admin import RuleAdmin
from robots.models import Rule, Url

from {{cookiecutter.repo_name}}.util.admin import force_django_template

admin.site.unregister(Rule)
admin.site.unregister(Url)
admin.site.unregister(Site)
admin.site.unregister(Group)
admin.site.unregister(EmailAddress)


@admin.register(Rule)
@force_django_template
class CustomRuleAdmin(RuleAdmin):
    pass


@admin.register(Url)
@force_django_template
class UrlAdmin(admin.ModelAdmin):
    pass


@admin.register(Site)
@force_django_template
class SiteAdmin(admin.ModelAdmin):
    pass


@admin.register(Group)
@force_django_template
class GroupAdmin(admin.ModelAdmin):
    pass


@admin.register(EmailAddress)
@force_django_template
class EmailAdmin(admin.ModelAdmin):
    pass
