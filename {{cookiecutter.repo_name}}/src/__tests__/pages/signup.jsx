import React from 'react';
import Signup from 'pages/signup';
import { SnackbarProvider } from 'notistack';
import { CurrentUserProvider, useMutateCurrentUser } from 'models/user';
import { createMount } from '@material-ui/core/test-utils';

describe('Signup page', () => {
    it('renders signup unchanged', () => {
        const tree = createMount(
            <SnackbarProvider>
                <CurrentUserProvider initialUser={null}>
                    <Signup />
                </CurrentUserProvider>
            </SnackbarProvider>
        );
        expect(tree).toMatchSnapshot();
    });
    it('reidrects you to home page if youre logged in', () => {});
    it('You can signup', () => {});
    it('after signup, redirected to next', () => {});
    it('reidrects you if youre on the page and you login in another tab to either default or next', () => {});
});
