import re
import datetime
import time
import string
import random


def file_url(category):
    def inner(instance, filename):
        r = re.compile(r'[^\S]')
        filename = r.sub('', filename)
        now = datetime.datetime.now()
        timestamp = int(time.time())
        return 'uploads/{0}/{1.year:04}/{1.month:02}/{1.day:02}/{2}/{3}'.format( \
                category, now, timestamp, filename)
    return inner

def random_string(length):
    alphanumeric = string.letters + string.digits
    return "".join(random.choice(alphanumeric) for i in range(length))
