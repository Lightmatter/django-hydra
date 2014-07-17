from django.core.management.base import BaseCommand, CommandError

#from app.models import SiteExperience
# import NoArgsCommand

import csv
import pdb
import re


from urlparse import urlparse
from os.path import splitext, basename



class Command(BaseCommand):
    #args[0] '<Full path to CSV file>'
    #help = 'Populates the ? table'

    def handle(self, *args, **options):
        pass
