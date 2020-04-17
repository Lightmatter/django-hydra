from djoser.views import TokenCreateView as DjoserTokenCreateView


class TokenCreateView(DjoserTokenCreateView):
    def _action(self, serializer):
        if not serializer.data.get("remember_me", False):
            self.request.session.set_expiry(0)
        return super()._action(serializer)
