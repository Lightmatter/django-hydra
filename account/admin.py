from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.contrib.auth.forms import UserCreationForm as DjangoUserCreationForm
from django.contrib.auth.forms import UserChangeForm  as DjangoUserChangeForm

import reversion

from .models import User


class UserCreationForm(DjangoUserCreationForm):
    def clean_username(self):
        username = self.cleaned_data["username"]
        try:
            # Not sure why UserCreationForm doesn't do this in the first place,
            # or at least test to see if _meta.model is there and if not use User...
            self._meta.model._default_manager.get(username=username)
        except self._meta.model.DoesNotExist:
            return username
        raise forms.ValidationError(self.error_messages['duplicate_username'])

    class Meta:
        model = User


class UserAdmin(reversion.VersionAdmin, DjangoUserAdmin):
    add_form = UserCreationForm
    #list_per_page = 25
    search_fields = ('username', 'email', 'first_name', 'last_name')
    list_display = ('email', 'first_name', 'last_name', 'created')

admin.site.register(User, UserAdmin)
