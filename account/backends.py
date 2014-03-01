from django.contrib.auth import get_user_model

User = get_user_model()


class UserAuthBackend():
    def authenticate(self, username=None, password=None):
        try:
            user = User.objects.get(email__iexact=username)
        except User.DoesNotExist:
            return None

        if user.check_password(password):
            return user

        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
