import re
import datetime
import time
import string
import random

from django.db import models
from django.template.loader import render_to_string

from model_utils.models import TimeStampedModel
from django.contrib.auth.models import AbstractUser
# Create your models here.

from {{ project_name }} import settings

def file_url(category):
    def inner(instance, filename):
        r = re.compile(r'[^\S]')
        filename = r.sub('', filename)
        now = datetime.now()
        timestamp = int(time.time())
        return 'uploads/{0}/{1.year:04}/{1.month:02}/{1.day:02}/{2}/{3}'.format( \
                category, now, timestamp, filename)
    return inner

def random_string(length):
    alphanumeric = string.letters + string.digits
    return "".join(random.choice(alphanumeric) for i in range(length))

class User(TimeStampedModel, AbstractUser):
    pass

    """ OPTIONAL
    def send_password_reset_email(self):
        code = random_string(40)
        hash = RedisHash("password_reset_codes")
        hash[code] = self.id

        params = {
            'user': self,
            'code': code,
            'BASE_URL': settings.BASE_URL }
        message = render_to_string("email/password_reset.txt", params)
        html_message = render_to_string("email/password_reset.html", params)

        subject = "Reset your password"
        sender = settings.DEFAULT_FROM_EMAIL

        msg = EmailMultiAlternatives(subject, message, sender, [self.email])
        msg.attach_alternative(html_message, 'text/html')
        msg.send()
        return True
    """


