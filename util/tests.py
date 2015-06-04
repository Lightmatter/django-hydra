import datetime
import time
from django.test import TestCase
from django.test.client import Client
from django.core.files.uploadedfile import SimpleUploadedFile
import io

from .util import random_string, file_url
from .models import TestFileModel


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
        expected = 'uploads/foo/{0.year:04}/{0.month:02}/{0.day:02}/{1}/some_filename'.format(now, timestamp)
        self.assertEqual(actual, expected)

    def test_file_upload(self):
        fake_file = SimpleUploadedFile("some_file.txt", bytes("asdf", "utf8"), content_type="text")
        now = datetime.datetime.now()
        timestamp = int(time.time())
        x = TestFileModel.objects.create(file_field=fake_file)
        actual = x.file_field.url
        expected = '/media/uploads/filez/{0.year:04}/{0.month:02}/{0.day:02}/{1}/some_file.txt'.format(now, timestamp)
        self.assertEqual(actual, expected)


#TODO: Write this test
class SendEmailtest(TestCase):
    pass
