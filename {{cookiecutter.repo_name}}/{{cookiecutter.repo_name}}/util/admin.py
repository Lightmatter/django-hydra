from django.contrib.admin.decorators import display
from django.contrib.admin.options import helpers
from django.contrib.auth.admin import admin
from django.forms.renderers import DjangoTemplates
from django.template.base import mark_safe


def force_django_template(AdminClass: type[admin.ModelAdmin]):
    """ Replaces your admin class with one which forces the use of the DjangoTemplates renderer
        Noted exceptions:
            - sub-widgets rendered by the RelatedFieldWidgetWrapper
        Usage:
            @admin.register(MyModel)
            @force_django_template
            class MyModelAdmin(admin.ModelAdmin):
                ...
    """
    action_form_class = None
    if ActionFormClass := getattr(AdminClass, "action_form", None):

        class ForcedDjangoActionForm(ActionFormClass):
            default_renderer = DjangoTemplates()

        action_form_class = ForcedDjangoActionForm

    def get_form(self, request, obj=None, change=False, **kwargs):
        form = AdminClass.get_form(self, request, obj=obj, change=change, **kwargs)
        form.default_renderer = DjangoTemplates()
        return form

    def changelist_view(self, request, extra_context=None):
        template_response = AdminClass.changelist_view(
            self, request, extra_context=extra_context
        )
        template_response.using = "django"
        return template_response

    def get_changelist_form(self, request, **kwargs):
        Form = AdminClass.get_changelist_form(self, request, **kwargs)
        Form.renderer = DjangoTemplates()
        return Form

    def get_changelist_formset(self, request, **kwargs):
        FormSet = AdminClass.get_changelist_formset(self, request, **kwargs)
        FormSet.renderer = DjangoTemplates()
        return FormSet

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
        f"{AdminClass.__name__}_forceddjangotemplates",
        (AdminClass,),
        {
            "get_form": get_form,
            "action_form": action_form_class,
            "changelist_view": changelist_view,
            "get_changelist_form": get_changelist_form,
            "get_changelist_formset": get_changelist_formset,
            "action_checkbox": action_checkbox,
        },
    )
