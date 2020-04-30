import React from 'react';
import EditProfile from 'pages/account/index';
import { SnackbarProvider } from 'notistack';
import { CurrentUserProvider, useMutateCurrentUser } from 'models/user';
import { createMount } from '@material-ui/core/test-utils';

describe('Edit profile page', () => {
    it('renders login unchanged', () => {
        const tree = createMount(
            <SnackbarProvider>
                <CurrentUserProvider initialUser={null}>
                    <EditProfile />
                </CurrentUserProvider>
            </SnackbarProvider>
        );
        expect(tree).toMatchSnapshot();
    });
    it('You can edit profile', () => {});
    it('you cant get here if logged out', () => {});
});
