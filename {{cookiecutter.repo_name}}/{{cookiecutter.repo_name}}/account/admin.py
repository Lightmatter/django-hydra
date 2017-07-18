from django.contrib import admin
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.contrib.auth.forms import UserCreationForm as DjangoUserCreationForm,\
    UserChangeForm as DjangoUserChangeForm
from import_export.admin import ImportExportMixin
from import_export import resources

from parsley.mixins import ParsleyAdminMixin

from .models import User


class UserResource(resources.ModelResource):
    class Meta:
        model = User


class UserCreationForm(DjangoUserCreationForm):
    class Meta:
        model = User
        fields = '__all__'


class UserChangeForm(DjangoUserChangeForm):
    class Meta:
        model = User
        fields = '__all__'


class UserAdmin(ParsleyAdminMixin, ImportExportMixin, DjangoUserAdmin):
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
