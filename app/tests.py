"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from django.test import TestCase
from django.test.client import Client

class SimpleTest(TestCase):
    def test_home(self):
        c = Client()
        response = c.get('/')
        self.assertEqual(response.status_code, 200)


from casper.tests import CasperTestCase
from django.contrib.staticfiles import finders


class SampleCasperTest(CasperTestCase):
    def test_something(self):
        self.assertTrue(self.casper(finders.find('js/tests/sample.casper.js')))

class QunitRunner(CasperTestCase):
    def test_something(self):
        self.assertTrue(self.casper(finders.find('js/tests/qunit.runner.js')))
