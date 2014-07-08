from .heroku_base import *

DEBUG = True
PIPELINE_ENABLED = True

MEDIA_URL = "https://s3-us-west-2.amazonaws.com/{{project_name}}-staging/"
