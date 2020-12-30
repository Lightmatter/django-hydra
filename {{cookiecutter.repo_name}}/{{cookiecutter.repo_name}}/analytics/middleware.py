import json
import requests
from ipware import get_client_ip


class BaseMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)


class IpMiddleware(BaseMiddleware):
    def process_view(self, request, view_func, view_args, view_kwargs):
        request.META["ANALYTICS-IP"] = get_client_ip(request)[0]
        return None