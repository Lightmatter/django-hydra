import axios from 'axios';

export default axios.create({
  xsrfCookieName: '{{cookiecutter.repo_name}}_csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
  baseURL: 'http://localhost:8000',
  withCredentials: true,
});
