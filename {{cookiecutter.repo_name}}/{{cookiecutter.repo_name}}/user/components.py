from django_components import component


@component.register("account-box")
class AccountBox(component.Component):
    # Note that Django will look for templates inside `[your app]/components` dir
    # To customize which template to use based on context override get_template_name instead
    template_name = "account/components/account-box.html"


@component.register("welcome-box")
class WelcomeBox(component.Component):
    # Note that Django will look for templates inside `[your app]/components` dir
    # To customize which template to use based on context override get_template_name instead
    template_name = "account/components/welcome-box.html"


@component.register("login-box")
class LoginBox(component.Component):
    # Note that Django will look for templates inside `[your app]/components` dir
    # To customize which template to use based on context override get_template_name instead
    template_name = "account/components/login-box.html"


@component.register("signup-box")
class SignupBox(component.Component):
    # Note that Django will look for templates inside `[your app]/components` dir
    # To customize which template to use based on context override get_template_name instead
    template_name = "account/components/signup-box.html"
