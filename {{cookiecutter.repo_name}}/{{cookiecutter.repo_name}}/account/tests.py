from django.test import TestCase
from django.core.urlresolvers import reverse
from django.contrib.auth.hashers import make_password

from .forms import RegistrationForm
from .models import User
from .recipies import user_recipe


class UserManager(TestCase):
    def test_create_user(self):
        user = User.objects.create_user("jonnyrico@fednet.gov", password="iwanttoknowmore")
        User.objects.get(id=user.id)


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


    def test_register_login_flow_works(self):
        self.user = user_recipe.prepare()
        self.form_keys = RegistrationForm.base_fields.keys()
        self.form_data = {k: v for (k, v) in self.user.__dict__.items() if k in self.form_keys}
        self.form_data['tos'] = "True"
        self.form_data['password1'] = self.form_data['password2'] = "bugssuck"
        url = reverse("registration_register")
        actual = self.client.post(url, self.form_data)
        expected = reverse("home")
        self.assertRedirects(actual, expected)

        self.form_data = {"username": self.user.email,
                          "password": "bugssuck",
                          }

        self.client.logout()
        url = reverse('auth_login')
        actual = self.client.post(url, self.form_data)
        expected = reverse("home")
        self.assertRedirects(actual, expected)



class UserAdminTest(TestCase):
    def setUp(self):
        form_data = self.login_form_data = {"username": "ben@coolguy.com",
                                            "password": "yeahman"}

        self.user = user_recipe.make(email=form_data['username'],
                                     is_superuser=True,
                                     is_staff=True,
                                     password=make_password(form_data['password']),
        )

        self.client.login(username=self.login_form_data['username'],
                          password=self.login_form_data['password'])


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

        form_data = { "email": "robertcop@ocp.com",
                      "password1":"deadoraliveyourecomingwithme",
                      "password2":"deadoraliveyourecomingwithme",
        }
        actual = response = self.client.post(url, form_data)
        new_user = User.objects.latest("created")
        self.assertEqual(new_user.email, "robertcop@ocp.com")

        expected = reverse("admin:account_user_change", args=[new_user.id])
        self.assertRedirects(actual, expected)


    def test_user_admin_add_different_passwords(self):
        url = reverse("admin:account_user_add")
        form_data = { "email": "robertcop@ocp.com",
                      "password1":"deadoraliveyourecomingwithme",
                      "password2":"freezecreep",
        }
        response = self.client.post(url, form_data)
        actual = response.context['adminform'].form.errors
        expected = {'password2': ["The two password fields didn't match."]}
        self.assertEqual(actual, expected)

    def test_user_admin_change(self):
        url = reverse("admin:account_user_change", args=[self.user.id])
        form_data = {"email": "ben@coolguy.com",
                     "last_login_0": "2015-05-20",
                     "last_login_1": "03:38:28",
                     }
        actual = response = self.client.post(url, form_data)
        expected = reverse("admin:account_user_changelist")
        self.assertRedirects(actual, expected, target_status_code=302)
