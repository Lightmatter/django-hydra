from django.test import TestCase
from django.urls import reverse

from .views import error


class SimpleTest(TestCase):
    def test_home(self):
        url = reverse("home")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_error_route(self):
        visit = lambda: self.client.get(reverse("error"))
        self.assertRaises(Exception, error)
        self.assertRaises(Exception, visit)
