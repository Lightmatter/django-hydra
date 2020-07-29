import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

import isServer from 'util/isServer';

const serverBaseURL = process.env.SERVER_BASE_URL || 'http://127.0.0.1:8000';
export const clientBaseURL = process.env.API_BASE_URL || '';

const http = applyCaseMiddleware(
  axios.create({
    xsrfCookieName: '{{cookiecutter.repo_name}}_csrftoken',
    xsrfHeaderName: 'X-CSRFTOKEN',
    withCredentials: true,
  })
);

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
    err = {
      non_field_errors: 'There was a problem processing your request.',
    };
  } else {
    // Something happened in setting up the request and triggered an Error
    err = error;
  }
  return Promise.reject(err);
}

http.interceptors.request.use(config => {
  const newConfig = {
    ...config,
  };

  newConfig.baseURL = isServer() ? serverBaseURL : clientBaseURL;
  return newConfig;
});

http.interceptors.response.use(
  response => response,
  error => handleApiErrors(error)
);

export default http;
