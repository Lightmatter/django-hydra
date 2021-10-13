import React from 'react';

import renderer from 'react-test-renderer';
import Header from 'components/Header';

import { SnackbarProvider } from 'notistack';
import { CurrentUserProvider } from 'models/user'
import { render } from "@testing-library/react";
import { act } from 'react-dom/test-utils';

describe('Header', () => {
  it('renders header unchanged', () => {
    const renderedValue = render(
      <SnackbarProvider>
        <CurrentUserProvider>
          <Header />
        </CurrentUserProvider>
      </SnackbarProvider>
    );
    expect(renderedValue.container.innerHTML).toMatchSnapshot();
  });
  it('renders displays the users first name when booting  login', async () => {
    const user = { firstName: 'Ben' };
    const renderedValue = render(
      <SnackbarProvider>
        <CurrentUserProvider initialUser={user}>
          <Header />
        </CurrentUserProvider>
      </SnackbarProvider>
    );
    expect(renderedValue.container.innerHTML).toMatch('Hey Ben');
  });
  it('renders nothing for username without user ', async () => {
    const renderedValue = render(
      <SnackbarProvider>
        <CurrentUserProvider initialUser={null}>
          <Header />
        </CurrentUserProvider>
      </SnackbarProvider>
    );
    expect(renderedValue.container.innerHTML).not.toMatch('Hey');
  });
  it('renders a username after logging in ', async () => {});
  it('stops rendering a username after logging out ', async () => {});
});
