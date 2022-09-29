# flake8: noqa
# pylint: skip-file
from http import HTTPStatus

from django.contrib.auth.hashers import make_password
from django.test import TestCase
from django.urls import reverse
from model_bakery import baker

from {{cookiecutter.repo_name}}.util.tests import PlaywrightTestCase

from .models import User


class UserManagerTest(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(  # noqa: S106
            "jonnyrico@fednet.gov", password="iwanttoknowmore"
        )  # nosec
        User.objects.get(id=user.id)


class LoginTest(PlaywrightTestCase):
    def setUp(self):
        super().setUp()
        self.password = "IwouldLikeToKnowMore"  # noqa: S105
        self.user = baker.make_recipe(
            "{{cookiecutter.repo_name}}.user.user",
            is_superuser=True,
            is_staff=True,
            password=make_password(self.password),
        )
        self.url = reverse("user:account_welcome")

    def test_login(self):
        page = self.context.new_page()
        page.goto(f"{self.live_server_url}{self.url}")
        page.wait_for_selector("text=Log in/Sign up")
        page.fill("[name=email]", self.user.email)
        # TODO: Test for email is required attr
        page.click("#welcome-button")
        page.wait_for_selector(f"text=Welcome back, {self.user.first_name}!")
        # TODO: Test for password is required attr
        page.fill("[name=password]", self.password)
        page.click("#login-button")
        page.wait_for_load_state("networkidle")
        actual = page.url.removeprefix(self.live_server_url)
        self.assertEqual(actual, "/")

    def test_login_email_case_insensitive(self):
        page = self.context.new_page()
        page.goto(f"{self.live_server_url}{self.url}")
        page.wait_for_selector("text=Log in/Sign up")
        page.fill("[name=email]", self.user.email.upper())
        page.click("#welcome-button")
        page.wait_for_selector(f"text=Welcome back, {self.user.first_name}!")
        page.fill("[name=password]", self.password)
        page.click("#login-button")
        page.wait_for_load_state("networkidle")
        actual = page.url.removeprefix(self.live_server_url)
        self.assertEqual(actual, "/")

    def test_login_badpass(self):
        page = self.context.new_page()
        page.goto(f"{self.live_server_url}{self.url}")
        page.wait_for_selector("text=Log in/Sign up")
        page.fill("[name=email]", self.user.email.upper())
        page.click("#welcome-button")
        page.fill("[name=password]", "BUGSRULE")
        page.click("#login-button")
        error = page.text_content(
            "text=The e-mail address and/or password you specified are not correct."
        )
        self.assertTrue(error)


class RegistrationLiveTest(PlaywrightTestCase):
    def setUp(self):
        super().setUp()
        self.password = "yeahmanitsarealpass"  # noqa: S105
        self.form_data = self.login_form_data = {
            "email": "ben@coolguy.com",
            "email2": "ben@coolguy.com",
            "password1": self.password,
            "password2": self.password,
            "first_name": "ben",
            "last_name": "beecher",
        }
        self.url = reverse("user:account_welcome")

    def test_register(self):
        page = self.context.new_page()
        page.goto(f"{self.live_server_url}{self.url}")
        page.click('input[name="email"]')
        page.fill('input[name="email"]', self.form_data["email"])
        page.click("text=Continue")
        page.click('[placeholder="E-mail\\ address\\ confirmation"]')
        page.fill(
            '[placeholder="E-mail\\ address\\ confirmation"]', self.form_data["email2"]
        )
        page.click('[placeholder="First\\ Name"]')
        page.fill('[placeholder="First\\ Name"]', self.form_data["first_name"])
        # Click [placeholder="Last\ Name"]
        page.click('[placeholder="Last\\ Name"]')
        # Fill [placeholder="Last\ Name"]
        page.fill('[placeholder="Last\\ Name"]', self.form_data["last_name"])
        # Click [placeholder="Password"]
        page.click('[placeholder="Password"]')
        # Fill [placeholder="Password"]
        page.fill('[placeholder="Password"]', self.password)
        # Click [placeholder="Password\ \(again\)"]
        page.click('[placeholder="Password\\ \\(again\\)"]')
        # Fill [placeholder="Password\ \(again\)"]
        page.fill('[placeholder="Password\\ \\(again\\)"]', self.password)
        with page.expect_navigation(wait_until="networkidle"):
            page.click("text=Create Account")
        actual = page.url.removeprefix(self.live_server_url)
        self.assertEqual(actual, "/")

    def test_register_email_no_match(self):
        page = self.context.new_page()
        page.goto(f"{self.live_server_url}{self.url}")
        page.click('input[name="email"]')
        page.fill('input[name="email"]', self.form_data["email"])
        page.click("text=Continue")
        page.click('[placeholder="E-mail\\ address\\ confirmation"]')
        page.fill('[placeholder="E-mail\\ address\\ confirmation"]', "email@bademail.com")
        page.click('[placeholder="First\\ Name"]')
        page.fill('[placeholder="First\\ Name"]', self.form_data["first_name"])
        # Click [placeholder="Last\ Name"]
        page.click('[placeholder="Last\\ Name"]')
        # Fill [placeholder="Last\ Name"]
        page.fill('[placeholder="Last\\ Name"]', self.form_data["last_name"])
        # Click [placeholder="Password"]
        page.click('[placeholder="Password"]')
        # Fill [placeholder="Password"]
        page.fill('[placeholder="Password"]', self.password)
        # Click [placeholder="Password\ \(again\)"]
        page.click('[placeholder="Password\\ \\(again\\)"]')
        # Fill [placeholder="Password\ \(again\)"]
        page.fill('[placeholder="Password\\ \\(again\\)"]', "somethingwronggarbage")

        page.click("text=Create Account")

        error = page.text_content("text=You must type the same email each time.")
        self.assertTrue(error)

    def test_register_pass_no_match(self):
        page = self.context.new_page()
        page.goto(f"{self.live_server_url}{self.url}")
        page.click('input[name="email"]')
        page.fill('input[name="email"]', self.form_data["email"])
        page.click("text=Continue")
        page.click('[placeholder="E-mail\\ address\\ confirmation"]')
        page.fill(
            '[placeholder="E-mail\\ address\\ confirmation"]', self.form_data["email2"]
        )
        page.click('[placeholder="First\\ Name"]')
        page.fill('[placeholder="First\\ Name"]', self.form_data["first_name"])
        # Click [placeholder="Last\ Name"]
        page.click('[placeholder="Last\\ Name"]')
        # Fill [placeholder="Last\ Name"]
        page.fill('[placeholder="Last\\ Name"]', self.form_data["last_name"])
        # Click [placeholder="Password"]
        page.click('[placeholder="Password"]')
        # Fill [placeholder="Password"]
        page.fill('[placeholder="Password"]', self.password)
        # Click [placeholder="Password\ \(again\)"]
        page.click('[placeholder="Password\\ \\(again\\)"]')
        # Fill [placeholder="Password\ \(again\)"]
        page.fill('[placeholder="Password\\ \\(again\\)"]', "somethingwronggarbage")
        page.click("text=Create Account")
        error = page.text_content("text=You must type the same password each time.")
        self.assertTrue(error)


class RegistrationTest(TestCase):
    def setUp(self):
        self.password = "yeahmanitsarealpass"  # noqa: S105
        self.form_data = self.login_form_data = {
            "email": "ben@coolguy.com",
            "email2": "ben@coolguy.com",
            "password1": self.password,
            "password2": self.password,
            "first_name": "ben",
            "last_name": "beecher",
        }
        self.url = reverse("account_signup")

    def test_register(self):
        actual = User.objects.count()
        self.assertEqual(0, actual)
        response = self.client.post(self.url, self.form_data, follow=True)
        self.assertRedirects(response, "/")
        actual = User.objects.count()
        self.assertEqual(1, actual)
        coolguy = User.objects.first()
        self.assertTrue(coolguy.check_password(self.password))

    def test_register_bad_repeat_email(self):
        email = self.form_data["email"]
        baker.make(User, email=email)

        actual = User.objects.count()
        self.assertEqual(1, actual)

        response = self.client.post(self.url, self.form_data)
        self.assertEqual(response.status_code, HTTPStatus.OK)

        actual = User.objects.count()
        self.assertEqual(1, actual)

        self.form_data["email"] = email.upper()

        response = self.client.post(self.url, self.form_data)
        self.assertEqual(response.status_code, HTTPStatus.OK)

        actual = User.objects.count()
        self.assertEqual(1, actual)

    def test_register_bad_repeat_pass1(self):
        self.form_data["password1"] = "oh no, oh no"
        response = self.client.post(self.url, self.form_data)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        actual = User.objects.count()
        self.assertEqual(0, actual)

    def test_register_bad_repeat_pass(self):
        self.form_data["password2"] = "oh no, oh no"
        response = self.client.post(self.url, self.form_data)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        actual = User.objects.count()
        self.assertEqual(0, actual)

    def test_register_no_repeat_pass(self):
        del self.form_data["password2"]
        response = self.client.post(self.url, self.form_data)
        self.assertEqual(response.status_code, HTTPStatus.OK)
        actual = User.objects.count()
        self.assertEqual(0, actual)


class UserAdminTest(TestCase):
    def setUp(self):
        form_data = self.login_form_data = {
            "username": "ben@coolguy.com",
            "password": "yeahman",
        }
        self.user = baker.make_recipe(
            "{{cookiecutter.repo_name}}.user.user",
            email=form_data["username"],
            is_superuser=True,
            is_staff=True,
            password=make_password(form_data["password"]),
        )

        self.client.login(
            username=self.login_form_data["username"],
            password=self.login_form_data["password"],
        )

    def test_user_admin_list(self):
        url = reverse("admin:user_user_changelist")
        response = self.client.get(url)
        actual = response.status_code
        expected = 200
        self.assertEqual(actual, expected)

    def test_user_admin_detail(self):
        url = reverse("admin:user_user_change", args=[self.user.id])
        response = self.client.get(url)
        actual = response.status_code
        expected = 200
        self.assertEqual(actual, expected)

    def test_user_admin_add(self):
        url = reverse("admin:user_user_add")

        form_data = {
            "email": "robertcop@ocp.com",
            "password1": "deadoraliveyourecomingwithme",
            "password2": "deadoraliveyourecomingwithme",
        }
        actual = self.client.post(url, form_data)
        new_user = User.objects.latest("created")
        self.assertEqual(new_user.email, "robertcop@ocp.com")

        expected = reverse("admin:user_user_change", args=[new_user.id])
        self.assertRedirects(actual, expected)

    def test_user_admin_add_different_passwords(self):
        url = reverse("admin:user_user_add")
        form_data = {
            "email": "robertcop@ocp.com",
            "password1": "deadoraliveyourecomingwithme",
            "password2": "freezecreep",
        }
        response = self.client.post(url, form_data)
        actual = response.context["adminform"].form.errors
        expected = {"password2": ["The two password fields didn’t match."]}
        self.assertEqual(actual, expected)

    def test_user_admin_change(self):
        url = reverse("admin:user_user_change", args=[self.user.id])
        form_data = {
            "email": "ben@coolguy.com",
            "last_login_0": "2015-05-20",
            "last_login_1": "03:38:28",
        }
        actual = self.client.post(url, form_data)
        expected = reverse("admin:user_user_changelist")
        self.assertRedirects(actual, expected, target_status_code=302)
