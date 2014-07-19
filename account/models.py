from django.db import models

from model_utils.models import TimeStampedModel
from django.contrib.auth.models import AbstractUser
# Create your models here.

from {{ project_name }} import settings

class User(AbstractUser, TimeStampedModel):

    #custom user fields go here
    ####
    def __unicode__(self):
        if self.get_full_name() == "":
            return self.email
        else:
            return super(User, self).__unicode__()


    def get_absolute_url(self):
        """
        The absolute url of the user model
        """

        raise NotImplemented()
