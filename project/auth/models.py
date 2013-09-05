from django.db import models
from model_utils.models import TimeStampedModel
# Create your models here.


from django.contrib.auth.models import AbstractUser


class User(TimeStampedModel, AbstractUser):
    pass
