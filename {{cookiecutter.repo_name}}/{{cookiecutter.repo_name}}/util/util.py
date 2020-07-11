import datetime
import inspect
import random
import re
import string
import time
from enum import Enum

from django.utils.deconstruct import deconstructible


@deconstructible
class file_url:  # NOQA
    path = "uploads/{0}/{1.year:04}/{1.month:02}/{1.day:02}/{2}/{3}"  # NOQA

    def __init__(self, category):
        self.category = category

    def __call__(self, instance, filename):
        r = re.compile(r"[^\S]")
        filename = r.sub("", filename)
        now = datetime.datetime.now()
        timestamp = int(time.time())
        return self.path.format(self.category, now, timestamp, filename)


def random_string(length):
    alphanumeric = string.ascii_letters + string.digits
    return "".join(random.choice(alphanumeric) for i in range(length))  # nosec


class ChoiceEnum(Enum):
    @classmethod
    def choices(cls):
        # get all members of the class
        members = inspect.getmembers(cls, lambda m: not (inspect.isroutine(m)))
        # filter down to just properties
        props = [m for m in members if not (m[0][:2] == "__")]
        # format into django choice tuple
        choices = tuple([(str(p[1].value), p[0]) for p in props])
        return choices
