from .heroku_base import *

DEBUG = False

MEDIA_URL = "https://s3-us-west-2.amazonaws.com/{{project_name}}-prod/"
