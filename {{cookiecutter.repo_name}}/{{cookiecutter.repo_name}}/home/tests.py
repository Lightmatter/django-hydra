from django.urls import reverse
from django.test import TestCase

from .views import error


class SimpleTest(TestCase):
    def test_home(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

    def test_error_route(self):
        visit = lambda: self.client.get(reverse('error'))
        self.assertRaises(Exception, error)
        self.assertRaises(Exception, visit)
