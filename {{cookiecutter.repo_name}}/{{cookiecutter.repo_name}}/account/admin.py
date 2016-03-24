from django.contrib import admin
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.contrib.auth.forms import UserCreationForm as DjangoUserCreationForm
from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from import_export.admin import ImportExportMixin
from import_export import resources

from .models import User


class UserResource(resources.ModelResource):
    class Meta:
        model = User


class UserCreationForm(DjangoUserCreationForm):
    class Meta:
        model = User
        fields = '__all__'


class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField(label=_("Password"),
        help_text=_("Raw passwords are not stored, so there is no way to see "  # noqa
                    "this user's password, but you can change the password "
                    "using <a href=\"../password/\">this form</a>."))

    class Meta:
        model = User
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        f = self.fields.get('user_permissions', None)
        if f is not None:
            f.queryset = f.queryset.select_related('content_type')

    def clean_password(self):
        # Regardless of what the user provides, return the initial value.
        # This is done here, rather than on the field, because the
        # field does not have access to the initial value
        return self.initial["password"]


class UserAdmin(ImportExportMixin, DjangoUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'created')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )

    add_form = UserCreationForm
    form = UserChangeForm
    # list_per_page = 25
    search_fields = ('email', 'first_name', 'last_name')
    readonly_fields = ('created', 'last_login')
    list_display = ('email', 'first_name', 'last_name', 'created')
    ordering = ('email',)

admin.site.register(User, UserAdmin)
