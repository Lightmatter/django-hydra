import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import constate from 'constate';
import { useSnackbar } from 'notistack';
import useSWR from 'swr';

import axios from 'util/axios';
import { EMAIL, REQUIRED, TOO_LONG, TOO_SHORT, URLS } from '../constants';

function equalTo(yupRef, msg) {
  const ref = Yup.ref(yupRef);
  return this.test({
    name: 'equalTo',
    exclusive: false,
    message: msg || `${ref.path} must be the same!`,
    params: {
      reference: ref.path,
    },
    test(value) {
      return value === this.resolve(ref);
    },
  });
}

Yup.addMethod(Yup.string, 'equalTo', equalTo);
const name = Yup.string()
  .min(2, TOO_SHORT)
  .max(50, TOO_LONG)
  .required(REQUIRED);

const password = Yup.string().required(REQUIRED).min(6, TOO_SHORT);

const email = Yup.string().email(EMAIL).required(REQUIRED);

const UserDetailSchema = {
  firstName: name,
  lastName: name,
};

const SetPassSchema = {
  password,
  rePassword: password.equalTo('password', 'The Two Passwords Must Match'),
};

export const ProfileSchema = Yup.object().shape({
  ...UserDetailSchema,
});
export const SignupSchema = Yup.object().shape({
  ...UserDetailSchema,
  ...SetPassSchema,
  email,
  tos: Yup.boolean().required(REQUIRED).oneOf([true], 'Field must be checked'),
});

export const LoginSchema = Yup.object().shape({
  password,
  email,
});

export const ForgotPassSchema = Yup.object().shape({
  email,
});

export const ResetPassSchema = Yup.object().shape({
  newPassword: password,
  reNewPassword: password.equalTo(
    'newPassword',
    'The Two Passwords Must Match'
  ),
});

export const ChangePassSchema = Yup.object().shape({
  currentPassword: password,
  newPassword: password,
  reNewPassword: password.equalTo(
    'newPassword',
    'The Two Passwords Must Match'
  ),
});

export const ChangeEmailSchema = Yup.object().shape({
  newEmail: email,
  reNewEmail: email.equalTo('newEmail', 'The Two Emails must match'),
  currentPassword: password,
});
export const DeleteUserSchema = Yup.object().shape({
  currentPassword: password,
});

export function registerUser(userData) {
  return axios.post(URLS.register, userData);
}

export function updateUser(userData) {
  return axios.put(URLS.usersMe, userData);
}

export function deleteUser(data) {
  return axios.delete(URLS.usersMe, { data }).then(() => {
    window.dispatchEvent(new Event('logout'));
    window.localStorage.setItem('logout', Date.now());
  });
}

export function logIn(userData) {
  return axios.post(URLS.login, userData).then(() => {
    // use login session, so this should set a cookie but return a token. We still love you token.
    /* const token = `Token ${response.data.key}`; */
    // notify app that we've logged in
    window.dispatchEvent(new Event('login'));
    window.localStorage.setItem('login', Date.now());
  });
}

export function logOut() {
  return axios.post(URLS.logout).then(() => {
    window.dispatchEvent(new Event('logout'));
    window.localStorage.setItem('logout', Date.now());
  });
}

export function forgotPass(userEmail) {
  return axios.post(URLS.resetPassword, userEmail);
}

export function resetPass(userInfo) {
  return axios.post(URLS.resetPasswordConfirm, userInfo);
}

export function changePass(data) {
  return axios.post(URLS.setPassword, data);
}

export function changeEmail(data) {
  return axios.post(URLS.setEmail, data);
}

export function confirmEmail(uid, token) {
  const data = { uid, token };
  return axios.post(URLS.userActivation, data);
}

export function resendConfirmEmail() {
  return axios.post(URLS.resendActivation);
}
let isAuthenticated;
let setAuthenticated;

export function useCurrentUserSWR({ initialUser }) {
  [isAuthenticated, setAuthenticated] = useState(Boolean(initialUser));
  const { enqueueSnackbar } = useSnackbar();
  const options = {
    shouldRetryOnError: false,
    onSuccess: () => {
      if (isAuthenticated === false) {
        setAuthenticated(true);
      }
    },
    onError: err => {
      if (
        err.isAxiosError &&
        err.response?.status === 403 &&
        isAuthenticated === true
      ) {
        setAuthenticated(false);
        enqueueSnackbar('Something caused you to be logged out!', {
          variant: 'warning',
        });
      }
    },
    // revalidateOnFocus: isAuthenticated, //TODO: Currently a bug in useSWR - this doesn't change between renders
    initialData: initialUser,
  };

  // TODO: this will make a request to the server on tab focus if you're logged out.
  // really we shouldn't do that - we know if the revalidation attempt will be successful or not based on isauthenticated
  // This could be smarter w/ a stateful representation of isAuthenticated, vs a derived one to check to test.
  const { data, error, isValidating, mutate } = useSWR(
    URLS.usersMe,
    query =>
      axios({
        method: 'get',
        url: query,
        headers: { Accept: '*/*' }, // as fetch for preload doesn't set accept correctly
      }).then(response => response.data),
    options
  );
  const user = isAuthenticated ? data : null;

  useEffect(() => {
    const messageOtherTab = event => {
      if (event.key === 'logout') {
        enqueueSnackbar('You logged out in another tab!', {
          variant: 'warning',
        });
      } else if (event.key === 'login') {
        enqueueSnackbar('You logged in on another tab!', {
          variant: 'info',
        });
      }
    };

    const messageThisTab = event => {
      if (event.type === 'logout') {
        enqueueSnackbar('Successfully logged out', {
          variant: 'success',
        });
      } else if (event.type === 'login') {
        enqueueSnackbar('Successfully logged in', {
          variant: 'success',
        });
      }
    };

    const syncLogout = event => {
      if (event.key === 'logout' || event.type === 'logout') {
        setAuthenticated(false);
        mutate(null, false);
      }
    };
    const syncLogin = event => {
      if (event.key === 'login' || event.type === 'login') {
        setAuthenticated(true);
        mutate();
      }
    };

    window.addEventListener('storage', messageOtherTab);
    window.addEventListener('login', messageThisTab);
    window.addEventListener('logout', messageThisTab);

    window.addEventListener('storage', syncLogout);
    window.addEventListener('logout', syncLogout);

    window.addEventListener('storage', syncLogin);
    window.addEventListener('login', syncLogin);

    return () => {
      window.removeEventListener('storage', syncLogout);
      window.removeEventListener('logout', syncLogout);
      window.localStorage.removeItem('logout');

      window.removeEventListener('storage', syncLogin);
      window.removeEventListener('login', syncLogin);
      window.localStorage.removeItem('login');

      window.removeEventListener('storage', messageOtherTab);
      window.removeEventListener('login', messageThisTab);
      window.removeEventListener('logout', messageThisTab);
    };
  }, []);

  return { user, isAuthenticated, error, isValidating, mutate };
}

export const [
  CurrentUserProvider,
  useCurrentUser,
  useIsAuthenticated,
  useCurrentUserError,
  useCurrentUserIsValidating,
  useMutateCurrentUser,
] = constate(
  useCurrentUserSWR,
  value => value.user,
  value => value.isAuthenticated,
  value => value.error,
  value => value.isValidating,
  value => value.mutate
);
