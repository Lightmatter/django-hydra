/* eslint-disable  max-classes-per-file  */
import { USER_ME } from 'models/user';
import { getAxios } from 'util/axios';
import _ from 'lodash';

const serverBaseURL = process.env.SERVER_BASE_URL || 'http://127.0.0.1:8000';
// import axios from 'util/axios';
// SAMPLE HEADERS coming in
// accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
// accept-encoding: "gzip, deflate, br"
// accept-language: "en-US,en;q=0.9,la;q=0.8"
// cache-control: "no-cache"
// connection: "keep-alive"
// cookie: "djdt=show; {{cookiecutter.repo_name}}_csrftoken=token; {{cookiecutter.repo_name}}_sessionid=session"
// dnt: "1"
// host: "localhost:3000"
// pragma: "no-cache"
// referer: "http://localhost:3000/account"
// sec-fetch-dest: "document"
// sec-fetch-mode: "navigate"
// sec-fetch-site: "same-origin"
// sec-fetch-user: "?1"
// upgrade-insecure-requests: "1"
// user-agent: <USER AGENT>

// SAMPLE HEADERS COMING OUT
// allow: "GET, PUT, PATCH, DELETE, HEAD, OPTIONS"
// content-length: "82"
// content-type: "application/json"
// date: "Mon, 20 Apr 2020 20:57:26 GMT"
// server: "WSGIServer/0.2 CPython/3.8.0"
// vary: "Accept, Cookie, Origin"
// x-content-type-options: "nosniff"
// x-frame-options: "DENY"
// x-xss-protection: "1; mode=block"
// __proto__: Object

class ServerDownError extends Error {}
class NotLoggedInError extends Error {}
class ServerBrokenError extends Error {}
class WTFError extends Error {}

export function forwardRequestHeaders(ctx) {
  ctx.axios.defaults.headers = ctx.req.headers;
  ctx.axios.defaults.headers.accept = 'application/json, text/plain, */*';

  // what other headers do we want to forward?? probably x forwarded for
  // TODO: def need to forward user agent as well
  // TODO: get request id in this
}

export function loginPageUrl(next) {
  // TODO: next should preserve querystring args
  if (next) {
    return `/login?next=${next}`;
  }
  return '/login';
}

export function postLoginUrl(query) {
  // TODO: next should preserve querystring args
    let { next = '/' } = query; // TODO should be setting controlled
  if (!next.startsWith('/')) {
    next = `/${next}`;
  }
  return next;
}

async function wrapContextUser(ctx) {
  forwardRequestHeaders(ctx);
  let response;
  try {
    response = await ctx.axios({
      method: 'get',
      url: USER_ME,
      baseURL: serverBaseURL,
    });
  } catch (e) {
    let code;
    if (e.isAxiosError) {
      code = e.response.status;
    } else {
      code = e.code;
    }
    switch (code) {
    case 500:
      throw new ServerBrokenError('Servers broken');
    case 403:
      throw new NotLoggedInError('not logged in');
    case 'ECONNREFUSED':
      throw new ServerDownError('Servers Down');
    default:
      throw new WTFError('I have no idea how this broke');
    }
  }
  // do we need to forward status code??
  // should we care about vary??
  return response.data;
}


const wrappedGetServerSideProps = (func, loginDetails) => {
  if (func === undefined) {
    // eslint-disable-next-line no-param-reassign
    func = async () => {
      return {
        props: {},
      };
    };
  }
  return async ctx => {
    ctx.axios = getAxios();
    let user = null;
    try {
      user = await wrapContextUser(ctx);
      if (loginDetails.loginPrevented) {
        return {
          redirect: {
                        destination: postLoginUrl(ctx.query),
            permanent: false,
          },
        };
      }
    } catch (e) {
      if (e instanceof NotLoggedInError && loginDetails.loginRequired) {
        return {
          redirect: {
            destination: loginPageUrl(ctx.req.url),
            permanent: false,
          },
        };
      }
      if (
        e instanceof ServerDownError ||
          e instanceof ServerBrokenError
      ) {
        throw e; // TODO: handle this case better
      }
    }
    let pageProps = await func(ctx);
    // next doesn't want to allow alterations to props
    pageProps = _.cloneDeep(pageProps);
    if ('props' in pageProps) {
      pageProps.props.user = user;
    }
    return pageProps;
  };
};

export const withAuthRequired = WrappedFunc => {
  return wrappedGetServerSideProps(WrappedFunc, {
    loginRequired: true,
    loginPrevented: false,
  });
};

export const withAuth = WrappedFunc => {
  return wrappedGetServerSideProps(WrappedFunc, {
    loginRequired: false,
    loginPrevented: false,
  });
};

export const withoutAuth = WrappedFunc => {
  return wrappedGetServerSideProps(WrappedFunc, {
    loginRequired: false,
    loginPrevented: true,
  });
};
