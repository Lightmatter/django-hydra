from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import LiveServerTestCase, TestCase, tag

import atexit
import datetime
import subprocess
import time
import unittest

from .models import TestFileModel
from .util import file_url, random_string


class RandomStringTest(TestCase):
    def test_random_string(self):
        alphanumeric = "[a-zA-Z0-9]*"
        string = random_string(3)
        actual = len(string)
        expected = 3
        self.assertEqual(actual, expected)
        self.assertRegexpMatches(string, alphanumeric)
        string = random_string(8)
        actual = len(string)
        expected = 8
        self.assertEqual(actual, expected)
        self.assertRegexpMatches(string, alphanumeric)


class FileUrlTest(TestCase):
    def test_file_url(self):
        file_url_obj = file_url("foo")
        self.assertEqual(file_url_obj.category, "foo")
        timestamp = int(time.time())
        actual = file_url_obj("trash", "some_filename")
        now = datetime.datetime.now()
        expected = "uploads/foo/{0.year:04}/{0.month:02}/{0.day:02}/{1}/some_filename".format(
            now, timestamp
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


# TODO: Write this test
class SendEmailtest(TestCase):
    pass


class NextJsBuilderBorg:
    has_built = False
    nextjs = None

    @classmethod
    def build(cls):
        if not cls.has_built:
            cls.nextjs = subprocess.call(["npx", "next", "build"])
            cls.has_built = True

    @classmethod
    def run_next(cls):
        if not cls.nextjs:
            cls.nextjs = subprocess.Popen(
                ["npx", "next", "start"],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
            )

            def kill_next():
                cls.nextjs.terminate()

            atexit.register(kill_next)


@tag("integration")
class NextjsCypressTest(LiveServerTestCase):
    port = 8000  # brittle - this must match next compilation.

    def setUp(self):
        NextJsBuilderBorg.build()
        NextJsBuilderBorg.run_next()
        super().setUp()

    # todo - capture process output no matter what, and then print on test fail
    def run_cypress_test(self, spec, silent=True, browser=False, keep=False):
        browser_flag = ["--browser", "chrome"]
        command = [
            "yarn",
            "run",
            "cypress",
            "run",
            "--spec",
            "src/__tests__/cypress/integration/{}".format(spec),
        ]
        if browser:
            command.extend(browser_flag)
            command.extend(["--no-exit"])
        return subprocess.run(command, capture_output=silent,)
