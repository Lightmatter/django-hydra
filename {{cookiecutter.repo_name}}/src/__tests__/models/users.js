import React from 'react';
import Login from 'pages/login';
import { SnackbarProvider } from 'notistack';
import { CurrentUserProvider, useMutateCurrentUser } from 'models/user';
import { createMount } from '@material-ui/core/test-utils';

//TODO: Renders correctly, renders poorly
describe('SignupSchema', () => {});
describe('LoginSchema', () => {});
describe('ForgotPassSchema', () => {});
describe('ResetPassSchema', () => {});
describe('ProfileSchema', () => {});
describe('ChangeEmailSchema', () => {});
describe('ChangePassSchema', () => {});
describe('DeleteUserSchema', () => {});

//good data, poor data, 500 error from server
describe('registerUser', () => {});
describe('updateUser', () => {});
describe('deleteUser', () => {});
describe('forgotPass', () => {});
describe('resetPass', () => {});
describe('changePass', () => {});
// also check these two issues events
describe('logIn', () => {});
describe('logOut', () => {});

describe('useCurrentUserSWR', () => {
  it('takes initial data', () => {});
  it('returns good user', () => {});
  it('registers events', () => {});
  it('isAuthenticated changes with user info', () => {});
  it('can be mutated', () => {});
});
