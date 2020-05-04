from rest_framework.generics import CreateAPIView

from djoser.conf import settings
from djoser.views import TokenCreateView as DjoserTokenCreateView
from djoser.views import UserViewSet as DjoserUserViewSet

from .serializers import UserCreateSerializer


class TokenCreateView(DjoserTokenCreateView):
    def _action(self, serializer):
        if not serializer.data.get("remember_me", False):
            self.request.session.set_expiry(0)
        return super()._action(serializer)


class UserCreateView(CreateAPIView):
    serializer_class = UserCreateSerializer

    perform_create = DjoserUserViewSet.perform_create

    permission_classes = settings.PERMISSIONS.user_create

    def post(self, request, *args, **kwargs):
        register_serializer = self.get_serializer(data=request.data)
        login_serializer = settings.SERIALIZERS.token_create(data=request.data)

        if register_serializer.is_valid():
            return self.create(request, *args, **kwargs)
        if login_serializer.is_valid():
            view = TokenCreateView()
            view.request = self.request
            return view._action(login_serializer)  # NOQA
        register_serializer.is_valid(raise_exception=True)
        return False  # make pylint happy
