import axios from 'axios';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const serverBaseURL = serverRuntimeConfig?.API_BASE_URL;
const clientBaseURL = process.env.API_BASE_URL;
export const baseURL = serverBaseURL || clientBaseURL;

export default axios.create({
  xsrfCookieName: '{{cookiecutter.repo_name}}_csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
  baseURL: baseURL,
  withCredentials: true,
});
