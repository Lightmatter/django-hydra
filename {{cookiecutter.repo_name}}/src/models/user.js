import axios from 'axios';
import { EMAIL, GENERIC_FIELD_ERROR, REQUIRED, TOO_LONG, TOO_SHORT } from '../constants.js';
import * as Yup from 'yup';

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

const AuthSchema = {
  username: Yup.string()
    .required(REQUIRED)
    .matches(/[a-zA-Z0-9_]/, 'username can only be letters and numbers'),
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
  password1: Yup.string()
    .required(REQUIRED)
    .min(6, TOO_SHORT),
  password2: Yup.string().equalTo('password1', 'The Two Passwords Must Match'),
});

export const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .required(REQUIRED)
    .min(6, TOO_SHORT),
  email: Yup.string()
    .email(EMAIL)
    .required(REQUIRED),
});

function setHeader(key) {
  if (key == null) {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('api_key');
  } else {
    axios.defaults.headers.common['Authorization'] = key;
    localStorage.setItem('api_key', key);
  }
}

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
  const url = `/account/rest-auth/user/`;
  return axios.get(url); //todo  - create hook to manage current user and set global state
}

export function removeStoredAuthToken() {
  // If we reach a state where token is invalid, remove it from local storage and trigger refresh
  localStorage.removeItem('api_key');
  window.location.reload();
}

export function registerUser(userData) {
  const url = `/account/rest-auth/registration/`;

  return axios
    .post(url, userData)
    .then(response => {
      const token = `Token ${response.data['key']}`;
      setHeader(token);
    })
    .catch(error => {
      return handleApiErrors(error);
    });
}

export function updateUser(userData, userId) {
  const url = `/account/users/${userId}/`;

  return axios.put(url, userData).catch(error => {
    return handleApiErrors(error);
  });
}

export function logIn(userData) {
  const url = `/account/rest-auth/login/`;
  return axios
    .post(url, userData)
    .then(response => {
      const token = `Token ${response.data['key']}`;
      setHeader(token);
    })
    .catch(error => {
      return handleApiErrors(error);
    });
}

export function logOut(user) {
  const url = `/account/rest-auth/logout/`;
  return axios
    .post(url)
    .then(() => {
      setHeader(null);
    })
    .then(() => {
      user.setLocalData(() => {});
    })
    .catch(error => {
      return handleApiErrors(error);
    });
}

export function forgotPass(email) {
  const url = `/account/rest-auth/password/reset/`;
  return axios.post(url, email).catch(error => {
    return handleApiErrors(error);
  });
}

export function confirmForgotPass(userInfo) {
  const url = `/account/rest-auth/password/reset/confirm/`;
  return axios.post(url, userInfo).catch(error => {
    return handleApiErrors(error);
  });
}

export function confirmEmail(token) {
  const url = `/account/confirm-email/${token}/`;
  return axios.get(url).catch(error => {
    return handleApiErrors(error);
  });
}

export function resendConfirmEmail(token) {
  const url = '/account/send-confirmation-email/';
  return axios.post(url).catch(error => {
    return handleApiErrors(error);
  });
}

//log the user in if they're returning
export const startup_api_key = localStorage.getItem('api_key');
setHeader(startup_api_key);
