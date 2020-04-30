import React from 'react';
import Login from 'pages/login';
import { SnackbarProvider } from 'notistack';
import { CurrentUserProvider, useMutateCurrentUser } from 'models/user';
import { createMount } from '@material-ui/core/test-utils';

describe('Login page', () => {
    it('renders login unchanged', () => {
        const tree = createMount(
            <SnackbarProvider>
                <CurrentUserProvider initialUser={null}>
                    <Login />
                </CurrentUserProvider>
            </SnackbarProvider>
        );
        expect(tree).toMatchSnapshot();
    });
    it('reidrects you to home page if youre logged in', () => {});
    it('You can login', () => {});
    it('after login, redirected to next', () => {});
    it('reidrects you if youre on the page and you login in another tab to either default or next', () => {});
});
