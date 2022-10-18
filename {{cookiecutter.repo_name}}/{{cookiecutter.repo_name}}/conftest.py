# pylint: disable=redefined-outer-name
# flake8: noqa: E800
import os
from typing import Generator

import pytest
from django.conf import settings
from playwright.sync_api import BrowserContext, ConsoleMessage, Error, Page, Playwright
from pytest_django.lazy_django import skip_if_no_django
from pytest_django.live_server_helper import LiveServer


@pytest.fixture(scope="session")
def playwright(playwright: Playwright) -> Generator[Playwright, None, None]:
    """Override of playwright fixture so we can set up for use with Django.

    Background: https://github.com/microsoft/playwright-python/issues/439
    """
    os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"

    yield playwright


@pytest.fixture
def context(context: BrowserContext) -> Generator[BrowserContext, None, None]:
    # Uncomment to disable or modify Playwright timeout
    # context.set_default_timeout(0)

    yield context


@pytest.fixture
def page(page: Page) -> Generator[Page, None, None]:
    """Override of playwright page fixture that raises any console errors."""
    page.on("console", raise_error)

    yield page


@pytest.fixture(scope="session")
def live_server(request):
    skip_if_no_django()
    addr = (
        request.config.getvalue("liveserver")
        or os.getenv("DJANGO_LIVE_TEST_SERVER_ADDRESS")
        or "localhost"
    )

    # Only way to fix static finding until this is merged:
    # https://github.com/pytest-dev/pytest-django/pull/1032
    if "django.contrib.staticfiles" in settings.INSTALLED_APPS:
        settings.INSTALLED_APPS.remove("django.contrib.staticfiles")

    server = LiveServer(addr)

    yield server

    server.stop()


def raise_error(msg: ConsoleMessage) -> None:
    """Raise an error if a console error occurs.

    Args:
        msg (ConsoleMessage): A console message.
    Raises:
        Error: An error message.
    """
    if msg.type != "error":
        return

    raise Error(f'error: {msg.text}, {msg.location["url"]}')
