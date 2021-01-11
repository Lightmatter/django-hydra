// STRINGS (MESSAGES)
const TOO_SHORT = 'Item is Too Short!';
const TOO_LONG = 'Item is Too Long!';
const REQUIRED = 'This Field is Required!';
const EMAIL = 'Invalid Email';
const GENERIC_FIELD_ERROR = "Something's not right";

{%- if cookiecutter.use_wagtail == 'y' %}

const API_URL = '/api/v2/';
{%- endif %}

const AUTH_BASE = '/auth/';
const URLS = {
  login: `${AUTH_BASE}token/login/`,
  usersMe: `${AUTH_BASE}users/me/`,
  register: `${AUTH_BASE}register/`,
  logout: `${AUTH_BASE}token/logout/`,
  resetPassword: `${AUTH_BASE}users/reset_password/`,
  restPasswordConfirm: `${AUTH_BASE}users/reset_password_confirm/`,
  setPassword: `${AUTH_BASE}users/set_password/`,
  setEmail: `${AUTH_BASE}users/set_email/`,
  userActivation: `${AUTH_BASE}users/activation/`,
  resendActivation: `${AUTH_BASE}users/resend_activation/`,
  {%- if cookiecutter.use_wagtail == 'y' %}

  api: {
    // Wagtail API urls
    base: `${API_URL}`,
    pages: `${API_URL}pages/`,
  },
  {%- endif %}
};

export { TOO_SHORT, TOO_LONG, REQUIRED, EMAIL, GENERIC_FIELD_ERROR, URLS };
