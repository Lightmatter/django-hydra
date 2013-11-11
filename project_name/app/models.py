from django.db import models
from model_utils.models import TimeStampedModel
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(TimeStampedModel, AbstractUser):
    pass
