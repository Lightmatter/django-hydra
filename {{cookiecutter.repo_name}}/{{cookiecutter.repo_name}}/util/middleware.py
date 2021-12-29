from django.template.loader import render_to_string

from django.contrib.messages import get_messages


def attach_messages(response):
    messages = render_to_string(
        "util/messages.html", {"messages": get_messages(response._request)}  # NOQA
    )
    response.content = response.content + messages.encode(response.charset)
    return response


class HTMXMessageMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_template_response(self, request, response):
        if request.htmx and not request.htmx.boosted:
            response.add_post_render_callback(attach_messages)
        return response


try:
    from debug_toolbar.middleware import DebugToolbarMiddleware as DJDTMiddleware

    class DebugToolbarMiddleware(DJDTMiddleware):
        @staticmethod
        def insert_toolbar(request, response, rendered):
            if request.htmx and not request.htmx.boosted:
                content = response.content.decode(response.charset)
                response.content = content + rendered
                return response, True
            return DJDTMiddleware.insert_toolbar(request, response, rendered)

        def configure_toolbar(self, request, toolbar):
            extra_attrs = "hx-boost='false' hx-push-url='false'"
            if request.htmx.boosted:
                toolbar.root_tag_extra_attrs = extra_attrs
                toolbar.should_render_js = toolbar.should_render_css = False
            elif request.htmx:
                toolbar.root_tag_extra_attrs = "hx-swap-oob='true' " + extra_attrs
                toolbar.should_render_js = toolbar.should_render_css = False

except ImportError:
    pass
