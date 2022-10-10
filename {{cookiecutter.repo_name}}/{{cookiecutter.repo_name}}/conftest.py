# pylint: disable=redefined-outer-name
import os

import pytest
from playwright.sync_api import Playwright


@pytest.fixture(scope="session")
def playwright(playwright: Playwright):
    os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"

    return playwright
