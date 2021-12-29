from allauth.account.forms import LoginForm

class AxesLoginForm(LoginForm):
    """
    Extended login form class that supplied the
    user credentials for Axes compatibility.
    """

    def user_credentials(self):
        credentials = super().user_credentials()
        credentials['login'] = credentials.get('email') or credentials.get('username')
        return credentials
