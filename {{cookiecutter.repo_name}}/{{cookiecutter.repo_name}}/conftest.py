# pylint: disable=redefined-outer-name
# flake8: noqa: E800
import os
from typing import Generator

import pytest
from django.db import connections
from django.test.testcases import LiveServerThread, _StaticFilesHandler
from django.test.utils import modify_settings
from playwright.sync_api import BrowserContext, ConsoleMessage, Error, Page, Playwright
from pytest_django.lazy_django import skip_if_no_django


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


class LiveServer:
    """The liveserver fixture

    This is the object that the ``live_server`` fixture returns.
    The ``live_server`` fixture handles creation and stopping.
    """

    def __init__(self, addr: str, start: bool = True) -> None:
        try:
            host, port_str = addr.split(":")
            port = int(port_str)
        except ValueError:
            host = addr
            port = 0

        connections_override = {}
        for conn in connections.all():
            # If using in-memory sqlite databases, pass the connections to
            # the server thread.
            if conn.vendor == "sqlite" and conn.is_in_memory_db():
                connections_override[conn.alias] = conn

        # `_live_server_modified_settings` is enabled and disabled by
        # `_live_server_helper`.
        self._live_server_modified_settings = modify_settings(
            ALLOWED_HOSTS={"append": host}
        )

        self.thread = LiveServerThread(
            host=host,
            static_handler=_StaticFilesHandler,
            connections_override=connections_override,
            port=port,
        )
        self.thread.daemon = True

        if start:
            self.start()

    def start(self) -> None:
        """Start the server"""
        for conn in self.thread.connections_override.values():
            # Explicitly enable thread-shareability for this connection.
            conn.inc_thread_sharing()

        self.thread.start()
        self.thread.is_ready.wait()

        if self.thread.error:
            error = self.thread.error
            self.stop()
            raise error

    def stop(self) -> None:
        """Stop the server"""
        # Terminate the live server's thread.
        self.thread.terminate()
        # Restore shared connections' non-shareability.
        for conn in self.thread.connections_override.values():
            conn.dec_thread_sharing()

    @property
    def url(self) -> str:
        return f"http://{self.thread.host}:{self.thread.port}"

    def __str__(self) -> str:
        return self.url

    def __add__(self, other) -> str:
        return f"{self}{other}"

    def __repr__(self) -> str:
        return "<LiveServer listening at %s>" % self.url
