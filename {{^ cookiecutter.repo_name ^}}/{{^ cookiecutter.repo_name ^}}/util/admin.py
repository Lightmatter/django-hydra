from django.contrib.admin.decorators import display
from django.contrib.admin.options import helpers
from django.contrib.auth.admin import admin
from django.forms.renderers import DjangoTemplates
from django.template.base import mark_safe


def force_django_template(admin_class: type[admin.ModelAdmin]):
    """Replaces your admin class with one which forces the useof
    of the DjangoTemplates renderer
        Noted exceptions:
            - sub-widgets rendered by the RelatedFieldWidgetWrapper
        Usage:
            @admin.register(MyModel)
            @force_django_template
            class MyModelAdmin(admin.ModelAdmin):
                ...
    """
    action_form_class = None
    if action_form_class := getattr(admin_class, "action_form", None):

        class ForcedDjangoActionForm(action_form_class):
            default_renderer = DjangoTemplates()

        action_form_class = ForcedDjangoActionForm

    def get_form(self, request, obj=None, change=False, **kwargs):
        form = admin_class.get_form(self, request, obj=obj, change=change, **kwargs)
        form.default_renderer = DjangoTemplates()
        return form

    def changelist_view(self, request, extra_context=None):
        template_response = admin_class.changelist_view(
            self, request, extra_context=extra_context
        )
        template_response.using = "django"
        return template_response

    def get_changelist_form(self, request, **kwargs):
        form = admin_class.get_changelist_form(self, request, **kwargs)
        form.renderer = DjangoTemplates()
        return form

    def get_changelist_formset(self, request, **kwargs):
        formset = admin_class.get_changelist_formset(self, request, **kwargs)
        formset.renderer = DjangoTemplates()
        return formset

    @display(description=mark_safe('<input type="checkbox" id="action-toggle">'))
    def action_checkbox(self, obj):
        """
        A list_display column containing a checkbox widget.
        """
        del self
        return helpers.checkbox.render(
            helpers.ACTION_CHECKBOX_NAME, str(obj.pk), renderer=DjangoTemplates()
        )

    return type(
        f"{admin_class.__name__}_forceddjangotemplates",
        (admin_class,),
        {
            "get_form": get_form,
            "action_form": action_form_class,
            "changelist_view": changelist_view,
            "get_changelist_form": get_changelist_form,
            "get_changelist_formset": get_changelist_formset,
            "action_checkbox": action_checkbox,
        },
    )
