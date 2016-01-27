from django.core.urlresolvers import reverse
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


from casper.tests import CasperTestCase
from django.contrib.staticfiles import finders


class SampleCasperTest(CasperTestCase):
    def test_something(self):
        self.assertTrue(self.casper(finders.find('js/tests/sample.casper.js')))


from djangojs.runners import JsTestCase
from djangojs.runners import QUnitSuite


class QunitTests(QUnitSuite, JsTestCase):
    title = 'Qunit tests'
    url_name = 'qunit_view'
