import axios from 'axios';
import isServer from 'util/isServer';

const serverBaseURL = process.env.SERVER_BASE_URL || 'http://127.0.0.1:8000';
export const clientBaseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const http = axios.create({
  xsrfCookieName: '{{cookiecutter.repo_name}}_csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
  withCredentials: true,
});

http.interceptors.request.use(config => {
  const newConfig = { ...config };

  newConfig.baseURL = isServer() ? serverBaseURL : clientBaseURL;
  return newConfig;
});

export default http;
