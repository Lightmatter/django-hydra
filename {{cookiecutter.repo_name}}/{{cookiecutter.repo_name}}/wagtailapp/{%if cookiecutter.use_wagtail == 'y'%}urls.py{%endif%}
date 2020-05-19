from django.urls import include, re_path

from wagtail.admin import urls as wagtailadmin_urls
from wagtail.contrib.sitemaps.views import sitemap
from wagtail.core import urls as wagtail_urls

urlpatterns = [
    re_path(r"^cms/", include(wagtailadmin_urls)),
    re_path(r"^sitemap\.xml$", sitemap),
    re_path(r"^", include(wagtail_urls)),
]
