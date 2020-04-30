import React, { useCallback, useEffect, useState } from 'react';
import axios from 'util/axios';
import { EMAIL, GENERIC_FIELD_ERROR, REQUIRED, TOO_LONG, TOO_SHORT } from '../constants.js';
import * as Yup from 'yup';
import constate from 'constate';

import { useSnackbar } from 'notistack';
import useSWR from 'swr';

export const USER_ME = '/auth/users/me/';

function equalTo(ref, msg) {
  ref = Yup.ref(ref);
  return this.test({
    name: 'equalTo',
    exclusive: false,
    message: msg || `${ref.path} must be the same!`,
    params: {
      reference: ref.path,
    },
    test: function(value) {
      return value === this.resolve(ref);
    },
  });
}

Yup.addMethod(Yup.string, 'equalTo', equalTo);
const name = Yup.string()
  .min(2, TOO_SHORT)
  .max(50, TOO_LONG)
  .required(REQUIRED);

const password = Yup.string()
  .required(REQUIRED)
  .min(6, TOO_SHORT);

const email = Yup.string()
  .email(EMAIL)
  .required(REQUIRED);

const UserDetailSchema = {
  first_name: name,
  last_name: name,
};

const SetPassSchema = {
  password: password,
  re_password: password.equalTo('password', 'The Two Passwords Must Match'),
};

export const ProfileSchema = Yup.object().shape({
  ...UserDetailSchema,
});
export const SignupSchema = Yup.object().shape({
  ...UserDetailSchema,
  ...SetPassSchema,
  email: email,
  tos: Yup.boolean()
    .required(REQUIRED)
    .oneOf([true], 'Field must be checked'),
});

export const LoginSchema = Yup.object().shape({
  password: password,
  email: email,
});

export const ForgotPassSchema = Yup.object().shape({
  email: email,
});

export const ResetPassSchema = Yup.object().shape({
  new_password: password,
  re_new_password: password.equalTo('new_password', 'The Two Passwords Must Match'),
});

export const ChangePassSchema = Yup.object().shape({
  current_password: password,
  new_password: password,
  re_new_password: password.equalTo('new_password', 'The Two Passwords Must Match'),
});

export const ChangeEmailSchema = Yup.object().shape({
  new_email: email,
  re_new_email: email.equalTo('new_email', 'The Two Emails must match'),
  current_password: password,
});
export const DeleteUserSchema = Yup.object().shape({
  current_password: password,
});

function handleApiErrors(error) {
  let err;
  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    err = error.response.data;
  } else if (error.request || error.isAxiosError) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    err = { non_field_errors: 'There was a problem processing your request.' };
  } else {
    // Something happened in setting up the request and triggered an Error
    err = error;
  }
  return Promise.reject(err);
}

export function registerUser(userData) {
  const url = `/auth/users/`;

  return axios
    .post(url, userData)
    .then(response => {})
    .catch(error => {
      return handleApiErrors(error);
    });
}

export function updateUser(userData, userId) {
  return axios.put(USER_ME, userData).catch(error => {
    return handleApiErrors(error);
  });
}

export function deleteUser(data) {
  const url = `/auth/users/me/`;
  return axios
    .delete(url, { data })
    .then(() => {
      window.dispatchEvent(new Event('logout'));
      window.localStorage.setItem('logout', Date.now());
    })
    .catch(error => {
      return handleApiErrors(error);
    });
}

export function logIn(userData) {
  const url = `/auth/token/login/`;
  return axios
    .post(url, userData)
    .then(response => {
      // use login session, so this should set a cookie but return a token. We still love you token.
      const token = `Token ${response.data['key']}`;
      //notify app that we've logged in
      window.dispatchEvent(new Event('login'));
      window.localStorage.setItem('login', Date.now());
    })
    .catch(error => {
      return handleApiErrors(error);
    });
}

export function logOut() {
  const url = `/auth/token/logout/`;
  return axios
    .post(url)
    .then(() => {
      window.dispatchEvent(new Event('logout'));
      window.localStorage.setItem('logout', Date.now());
    })
    .catch(error => {
      return handleApiErrors(error);
    });
}

export function forgotPass(email) {
  const url = `/auth/users/reset_password/`;
  return axios.post(url, email).catch(error => {
    return handleApiErrors(error);
  });
}

export function resetPass(userInfo) {
  const url = `/auth/users/reset_password_confirm/`;
  return axios.post(url, userInfo).catch(error => {
    return handleApiErrors(error);
  });
}

export function changePass(data) {
  const url = `/auth/users/set_password/`;
  return axios.post(url, data).catch(error => {
    return handleApiErrors(error);
  });
}

export function changeEmail(data) {
  const url = `/auth/users/set_email/`;
  return axios.post(url, data).catch(error => {
    return handleApiErrors(error);
  });
}

export function confirmEmail(uid, token) {
  const url = `/auth/users/activation/`;
  const data = { uid, token };
  return axios.post(url, data).catch(error => {
    return handleApiErrors(error);
  });
}

export function resendConfirmEmail(email) {
  const url = '/auth/users/resend_activation';
  const data = { email };
  return axios.post(url).catch(error => {
    return handleApiErrors(error);
  });
}
let isAuthenticated, setAuthenticated;

export function useCurrentUserSWR({ initialUser }) {
  [isAuthenticated, setAuthenticated] = useState(Boolean(initialUser));
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const options = {
    shouldRetryOnError: false,
    onSuccess: (data, key, config) => {
      if (isAuthenticated === false) {
        setAuthenticated(true);
      }
    },
    onError: (err, key, config) => {
      if (err.isAxiosError && err.response?.status === 403 && isAuthenticated === true) {
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
    USER_ME,
    query =>
      axios({
        method: 'get',
        url: query,
        headers: { Accept: '*/*' }, // as fetch for preload doesn't set accept correctly
      }).then(data => data.data),
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
  value => value.useCurrentUserIsValidating,
  value => value.mutate
);
