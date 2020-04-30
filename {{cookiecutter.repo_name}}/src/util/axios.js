import axios from 'axios';
import getConfig from 'next/config';
import isServer from 'util/isServer';

const serverBaseURL = process.env.SERVER_BASE_URL || '127.0.0.1:8000';
export const clientBaseURL = process.env.API_BASE_URL || '';

export const baseURL = isServer ? serverBaseURL : clientBaseURL;

export default axios.create({
  xsrfCookieName: '{{cookiecutter.repo_name}}_csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
  baseURL: baseURL,
  withCredentials: true,
});
