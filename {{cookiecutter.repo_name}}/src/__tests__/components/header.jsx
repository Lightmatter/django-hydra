import React from 'react';
import { createMount } from '@material-ui/core/test-utils';

import renderer from 'react-test-renderer';
import Header from 'components/Header';

import { SnackbarProvider } from 'notistack';
import { CurrentUserProvider } from 'models/user';
import { act } from 'react-dom/test-utils';

describe('Header', () => {
  it('renders header unchanged', () => {
    const renderedValue = createMount()(
      <SnackbarProvider>
        <CurrentUserProvider>
          <Header />
        </CurrentUserProvider>
      </SnackbarProvider>
    );

    expect(renderedValue.html()).toMatchSnapshot();
  });
  it('renders displays the users first name when booting  login', async () => {
    const user = { firstName: 'Ben' };
    const renderedValue = createMount()(
      <SnackbarProvider>
        <CurrentUserProvider initialUser={user}>
          <Header />
        </CurrentUserProvider>
      </SnackbarProvider>
    );
    expect(renderedValue.html()).toMatch('Hey Ben');
  });
  it('renders nothing for username without user ', async () => {
    const renderedValue = createMount()(
      <SnackbarProvider>
        <CurrentUserProvider initialUser={null}>
          <Header />
        </CurrentUserProvider>
      </SnackbarProvider>
    );
    expect(renderedValue.html()).not.toMatch('Hey');
  });
  it('renders a username after logging in ', async () => {});
  it('stops rendering a username after logging out ', async () => {});
});
