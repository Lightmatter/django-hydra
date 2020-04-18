import React, { useCallback } from 'react';
import axios from 'util/axios';
import { EMAIL, GENERIC_FIELD_ERROR, REQUIRED, TOO_LONG, TOO_SHORT } from '../constants.js';
import * as Yup from 'yup';
import constate from 'constate';

import useSWR from 'swr';

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

export const USER_ME = 'http://localhost:8000/auth/users/me/';

const AuthSchema = {
  first_name: Yup.string()
    .min(2, TOO_SHORT)
    .max(50, TOO_LONG)
    .required(REQUIRED),
  last_name: Yup.string()
    .min(2, TOO_SHORT)
    .max(50, TOO_LONG)
    .required(REQUIRED),
};

export const SignupSchema = Yup.object().shape({
  ...AuthSchema,
  email: Yup.string()
    .email(EMAIL)
    .required(REQUIRED),
  password: Yup.string()
    .required(REQUIRED)
    .min(6, TOO_SHORT),
  re_password: Yup.string()
    .required(REQUIRED)
    .equalTo('password', 'The Two Passwords Must Match'),
});

export const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .required(REQUIRED)
    .min(6, TOO_SHORT),
  email: Yup.string()
    .email(EMAIL)
    .required(REQUIRED),
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

export function getCurrentUserDetails() {
  return axios.get(USER_ME); //todo  - create hook to manage current user and set global state
}

export function registerUser(userData) {
  const url = `http://localhost:8000/auth/users/`;

  return axios
    .post(url, userData)
    .then(response => {})
    .catch(error => {
      return handleApiErrors(error);
    });
}

export function updateUser(userData, userId) {
  const url = USER_ME;
  //todo  - create hook to manage current user and set global state
  return axios.put(url, userData).catch(error => {
    return handleApiErrors(error);
  });
}

export function logIn(userData) {
  const url = `http://localhost:8000/auth/token/login/`;
  return axios
    .post(url, userData, {
      //AxiosRequestConfig parameter
      withCredentials: true, //correct
    })
    .then(response => {
      // use login session, so this should set a cookie but return a token. We still love you token.
      const token = `Token ${response.data['key']}`;
    })
    .catch(error => {
      return handleApiErrors(error);
    });
}

export function logOut() {
  const url = `/auth/token/logout/`;
  return axios
    .post(url)
    .then(() => {})
    .then(() => {}) //todo: clear data, use local session event hook to notify other tabs
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

export function confirmForgotPass(userInfo) {
  const url = `/auth/users/reset_password_confirm/`;
  return axios.post(url, userInfo).catch(error => {
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

export function useCurrentUserSWR() {
  const options = {
    shouldRetryOnError: false,
    onSuccess: function(data, key, config) {},
    onError: function(err, key, config) {},
  };
  const { data, error, isValidating, mutate } = useSWR(
    USER_ME,
    query =>
      axios({
        method: 'get',
        url: query,
        headers: { Accept: '*/*' }, // as fetch for preload doesn't set accept correctly
      }),
    options
  );
  const isAuthenticated = Boolean(data);
  const user = isAuthenticated ? data.data.data.attributes : {};
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
  value => useMutateCurrentUser
);
