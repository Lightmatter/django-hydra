from django.utils.translation import ugettext_lazy as _
from django.db import models
from .util import file_url


class TestFileModel(models.Model):
    file_field = models.ImageField(_("foo"), upload_to=file_url("filez"))
