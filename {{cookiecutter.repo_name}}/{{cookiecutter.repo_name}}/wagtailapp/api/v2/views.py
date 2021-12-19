from django.http import Http404

from rest_framework import permissions
from wagtail.api.v2.views import PagesAPIViewSet
from wagtail.core.models import Site

from .serializers import CustomPageSerializer


class CustomPagesAPIViewSet(PagesAPIViewSet):
    permission_classes = (permissions.AllowAny,)
    base_serializer_class = CustomPageSerializer

    def find_object(self, queryset, request):  # noqa: inconsistent-return-statements
        site = Site.find_for_request(request)
        if "html_path" in request.GET and site is not None:
            path = request.GET["html_path"]
            path_components = [component for component in path.split("/") if component]

            try:
                page, _, _ = site.root_page.specific.route(request, path_components)

            except Http404:
                return

            if queryset.filter(id=page.id).exists():
                return page

        return super().find_object(queryset, request)
