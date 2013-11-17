from django.db import models

from model_utils.models import TimeStampedModel
from django.contrib.auth.models import AbstractUser
# Create your models here.

from {{ project_name }} import settings

class User(TimeStampedModel, AbstractUser):
    pass
