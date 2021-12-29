from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase

import datetime
import os
import time
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from playwright.sync_api import sync_playwright

from .models import TestFileModel
from .util import file_url


class FileUrlTest(TestCase):
    def test_file_url(self):
        file_url_obj = file_url("foo")
        self.assertEqual(file_url_obj.category, "foo")
        timestamp = int(time.time())
        actual = file_url_obj("trash", "some_filename")
        now = datetime.datetime.now()
        expected = (
            "uploads/foo/{0.year:04}/{0.month:02}/{0.day:02}/{1}/some_filename".format(
                now, timestamp
            )
        )
        self.assertEqual(actual, expected)

    def test_file_upload(self):
        fake_file = SimpleUploadedFile(
            "some_file.txt", bytes("asdf", "utf8"), content_type="text"
        )
        now = datetime.datetime.now()
        timestamp = int(time.time())
        x = TestFileModel.objects.create(file_field=fake_file)
        actual = x.file_field.url
        expected = (
            settings.MEDIA_URL
            + "uploads/filez/{0.year:04}/{0.month:02}/{0.day:02}/{1}/some_file.txt".format(
                now, timestamp
            )
        )
        self.assertEqual(actual, expected)


class PlaywrightTestCase(StaticLiveServerTestCase):
    @classmethod
    def setUpClass(cls):
        os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
        super().setUpClass()
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch()

    def setUp(self):
        self.context = self.browser.new_context()
        self.context.set_default_timeout(3000)

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        cls.browser.close()
        cls.playwright.stop()


# TODO: Write this test
class SendEmailtest(TestCase):
    pass
