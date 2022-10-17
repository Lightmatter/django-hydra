# pylint: disable=redefined-outer-name
import os

import pytest
from playwright.sync_api import Playwright


@pytest.fixture(scope="session")
def playwright(playwright: Playwright) -> Playwright:
    """Override of playwright fixture so we can set up for use with Django.

    Background: https://github.com/microsoft/playwright-python/issues/439
    """
    os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"

    return playwright
