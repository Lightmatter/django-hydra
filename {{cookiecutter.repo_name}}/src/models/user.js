import React, { useCallback, useEffect, useState } from 'react';
import axios from 'util/axios';
import { EMAIL, GENERIC_FIELD_ERROR, REQUIRED, TOO_LONG, TOO_SHORT } from '../constants.js';
import * as Yup from 'yup';
import constate from 'constate';

import { useSnackbar } from 'notistack';
import useSWR from 'swr';

export const USER_ME = 'http://localhost:8000/auth/users/me/';

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

const UserDetailSchema = {
  first_name: Yup.string()
    .min(2, TOO_SHORT)
    .max(50, TOO_LONG)
    .required(REQUIRED),
  last_name: Yup.string()
    .min(2, TOO_SHORT)
    .max(50, TOO_LONG)
    .required(REQUIRED),
};

const SetPassSchema = {
  password: Yup.string()
    .required(REQUIRED)
    .min(6, TOO_SHORT),
  re_password: Yup.string()
    .required(REQUIRED)
    .equalTo('password', 'The Two Passwords Must Match'),
};

export const ProfileSchema = Yup.object().shape({
  ...UserDetailSchema,
});
export const SignupSchema = Yup.object().shape({
  ...UserDetailSchema,
  ...SetPassSchema,
  email: Yup.string()
    .email(EMAIL)
    .required(REQUIRED),
  tos: Yup.boolean()
    .required(REQUIRED)
    .oneOf([true], 'Field must be checked'),
});

export const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .required(REQUIRED)
    .min(6, TOO_SHORT),
  email: Yup.string()
    .email(EMAIL)
    .required(REQUIRED),
});

export const ForgotPassSchema = Yup.object().shape({
  email: Yup.string()
    .email(EMAIL)
    .required(REQUIRED),
});

export const ResetPassSchema = Yup.object().shape({
  new_password: Yup.string()
    .required(REQUIRED)
    .min(6, TOO_SHORT),
  re_new_password: Yup.string()
    .required(REQUIRED)
    .equalTo('new_password', 'The Two Passwords Must Match'),
});

export const ChangePassSchema = Yup.object().shape({
  current_password: Yup.string()
    .required(REQUIRED)
    .min(6, TOO_SHORT),
  new_password: Yup.string()
    .required(REQUIRED)
    .min(6, TOO_SHORT),
  re_new_password: Yup.string()
    .required(REQUIRED)
    .equalTo('new_password', 'The Two Passwords Must Match'),
});

export const DeleteUserSchema = Yup.object().shape({
  current_password: Yup.string()
    .required(REQUIRED)
    .min(6, TOO_SHORT),
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

export function getSelf() {
  return;
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

export function useCurrentUserSWR({ initialUser }) {
  const [isAuthenticated, setAuthenticated] = useState(Boolean(initialUser));
  const options = {
    shouldRetryOnError: false,
    onSuccess: (data, key, config) => {
      if (isAuthenticated === false) {
        setAuthenticated(true);
      }
    },
    onError: (err, key, config) => {
      if (err.isAxiosError && err.response.status === 403 && isAuthenticated === true) {
        setAuthenticated(false);
      }
    },
    // revalidateOnFocus: isAuthenticated,  //TODO: Currently a bug in useSWR - this doesn't change between renders
    initalData: initialUser,
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

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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

    window.addEventListener('storage', syncLogout);
    window.addEventListener('logout', syncLogout);

    window.addEventListener('storage', syncLogin);
    window.addEventListener('login', syncLogin);

    window.addEventListener('storage', messageOtherTab);
    window.addEventListener('login', messageThisTab);
    window.addEventListener('logout', messageThisTab);

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
