from django.contrib.auth.hashers import make_password
from django.test import TestCase
from django.urls import reverse
from rest_framework import status as s

from model_mommy import mommy
from .models import User
from .views import UserCreateView


class UserManager(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(
            "jonnyrico@fednet.gov", password="iwanttoknowmore"
        )  # nosec
        User.objects.get(id=user.id)


class LoginTest(TestCase):
    def setUp(self):
        pass


class RegistrationTest(TestCase):
    def setUp(self):
        self.form_data = self.login_form_data = {
            "email": "ben@coolguy.com",
            "password": "yeahman",
            "re_password": "yeahman",
            "first_name": "ben",
            "last_name": "beecher",
        }
        self.url = reverse("register")

    def test_register(self):
        response = self.client.post(self.url, self.form_data)
        self.assertEqual(response.status_code, s.HTTP_201_CREATED)

    def test_register_bad_repeat_email(self):
        response = self.client.post(self.url, self.form_data)
        self.assertEqual(response.status_code, s.HTTP_201_CREATED)
        self.form_data["password"] = "oh no"
        response = self.client.post(self.url, self.form_data)
        self.assertEqual(response.status_code, s.HTTP_400_BAD_REQUEST)

    def test_register_bad_repeat_pass(self):
        self.form_data["re_password"] = "oh no"
        response = self.client.post(self.url, self.form_data)
        self.assertEqual(response.status_code, s.HTTP_400_BAD_REQUEST)

    def test_register_no_repeat_pass(self):
        del self.form_data["re_password"]
        response = self.client.post(self.url, self.form_data)
        self.assertEqual(response.status_code, s.HTTP_400_BAD_REQUEST)

    def test_register_but_really_login(self):
        response = self.client.post(self.url, self.form_data)
        self.assertEqual(response.status_code, s.HTTP_201_CREATED)
        response = self.client.post(self.url, self.form_data)
        self.assertEqual(response.status_code, s.HTTP_200_OK)


class UserAdminTest(TestCase):
    def setUp(self):
        form_data = self.login_form_data = {
            "username": "ben@coolguy.com",
            "password": "yeahman",
        }
        self.user = mommy.make_recipe(
            "{{ cookiecutter.repo_name }}.account.user",
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
        url = reverse("admin:account_user_changelist")
        response = self.client.get(url)
        actual = response.status_code
        expected = 200
        self.assertEqual(actual, expected)

    def test_user_admin_detail(self):
        url = reverse("admin:account_user_change", args=[self.user.id])
        response = self.client.get(url)
        actual = response.status_code
        expected = 200
        self.assertEqual(actual, expected)

    def test_user_admin_add(self):
        url = reverse("admin:account_user_add")

        form_data = {
            "email": "robertcop@ocp.com",
            "password1": "deadoraliveyourecomingwithme",
            "password2": "deadoraliveyourecomingwithme",
        }
        actual = response = self.client.post(url, form_data)
        new_user = User.objects.latest("created")
        self.assertEqual(new_user.email, "robertcop@ocp.com")

        expected = reverse("admin:account_user_change", args=[new_user.id])
        self.assertRedirects(actual, expected)

    def test_user_admin_add_different_passwords(self):
        url = reverse("admin:account_user_add")
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
        url = reverse("admin:account_user_change", args=[self.user.id])
        form_data = {
            "email": "ben@coolguy.com",
            "last_login_0": "2015-05-20",
            "last_login_1": "03:38:28",
        }
        actual = response = self.client.post(url, form_data)
        expected = reverse("admin:account_user_changelist")
        self.assertRedirects(actual, expected, target_status_code=302)
