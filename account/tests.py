from django.test import TestCase
from django.core.urlresolvers import reverse

from .forms import RegistrationForm
from .models import User
from .recipies import user_recipe


class RegistrationTest(TestCase):
    def setUp(self):
        self.user = user_recipe.prepare()
        self.form_keys = RegistrationForm.base_fields.keys()
        self.form_data = {k: v for (k, v) in self.user.__dict__.items() if k in self.form_keys}
        self.form_data['tos'] = "True"
        self.form_data['password1'] = self.form_data['password2'] = "bugssuck"


    def test_user_registration_fails(self):
        """
        on failed registration, keep the user on the same page and ask for a fix
        """
        del self.form_data['tos']
        url = reverse("registration_register")
        response = self.client.post(url, self.form_data)
        actual = response.status_code
        expected = 200
        self.assertEqual(actual, expected)

    def test_user_registration_fails_passwords_must_match(self):
        self.form_data['password2'] = "bugs rule"

        url = reverse("registration_register")
        response = self.client.post(url, self.form_data)
        actual = response.status_code
        expected = 200
        self.assertEqual(actual, expected)
        actual = response.context['form'].errors['__all__']
        expected = ["The two password fields didn't match."]
        self.assertEqual(actual, expected)

    def test_user_registration_fails_unique_email(self):
        url = reverse("registration_register")
        actual = self.client.post(url, self.form_data)
        expected = reverse("home")
        self.assertRedirects(actual, expected)
        User.objects.get(email=self.user.email)
        response = self.client.post(url, self.form_data)
        actual = response.status_code
        expected = 200
        self.assertEqual(actual, expected)
        actual = response.context['form'].errors['email']
        expected = ["This email address is already in use. Please supply a different email address."]
        self.assertEqual(actual, expected)


    def test_user_registration_works(self):
        """
        on successful registration, move user to either
        their profile page or the next page specified in the querystring
        """
        url = reverse("registration_register")
        actual = self.client.post(url, self.form_data)
        expected = reverse("home")
        self.assertRedirects(actual, expected)
        User.objects.get(email=self.user.email)


class LoginTest(TestCase):
    def setUp(self):
        self.user = user_recipe.make()
        self.password = "wouldYouLikeToKnowMore"
        self.user.set_password(self.password)
        self.user.save()
        self.form_data = {"username": self.user.email,
                          "password": self.password,
                          }

    def test_user_login_unsuccessful(self):
        """
        on successful registration, keep user on login page
        and show error
        """
        self.form_data['password'] = "bugs rule federation drulz"
        url = reverse("auth_login")
        response = self.client.post(url, self.form_data)
        actual = response.status_code
        expected = 200
        self.assertEqual(actual, expected)
        actual = response.context['form'].errors['__all__']
        expected = ['Please enter a correct email address and password. Note that both fields may be case-sensitive.']
        self.assertEqual(actual, expected)

    def test_login_works(self):
        """
        on attempted login, move user to the special page
        """
        url = reverse('auth_login')
        actual = self.client.post(url, self.form_data)
        expected = reverse("home")
        self.assertRedirects(actual, expected)
