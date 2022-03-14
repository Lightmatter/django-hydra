from django_components import component


@component.register("account_box")
class AccountBox(component.Component):
    template_name = "account/components/account_box.html"


@component.register("welcome_box")
class WelcomeBox(component.Component):
    template_name = "account/components/welcome_box.html"


@component.register("login_box")
class LoginBox(component.Component):
    template_name = "account/components/login_box.html"


@component.register("signup_box")
class SignupBox(component.Component):
    template_name = "account/components/signup_box.html"
