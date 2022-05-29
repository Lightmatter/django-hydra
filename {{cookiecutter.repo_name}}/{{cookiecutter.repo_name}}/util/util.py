import datetime
import re
import time

from django.utils.deconstruct import deconstructible
from django.views.generic.base import TemplateView


class HtmxView(TemplateView):
    """
    This view will act as a normal template view, but will allow you to return a status code
    in the .as_view function. This is useful for Htmx since various status codes are used
    with views to signal that something has changed. E.g. returning 286 can turn off a
    /get automatically polling.

    Sample, inside urlpatterns:
    path(r"news/", HtmxView.as_view(template_name="news.html", status=286)),
    """
    status = 200

    def render_to_response(self, context, **response_kwargs):
        response_kwargs["status"] = self.status
        return super(TemplateView, self).render_to_response(context, **response_kwargs)

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
