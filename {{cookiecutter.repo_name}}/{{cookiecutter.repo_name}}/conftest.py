# pylint: disable=redefined-outer-name
# flake8: noqa: E800
import os
from collections.abc import Generator

import pytest
from playwright.sync_api import BrowserContext, ConsoleMessage, Error, Page, Playwright


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
    # context.set_default_timeout(0)  # In milliseconds

    yield context


@pytest.fixture
def page(page: Page) -> Generator[Page, None, None]:
    """Override of playwright page fixture that raises any console errors."""
    page.on("console", raise_error)

    yield page


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
