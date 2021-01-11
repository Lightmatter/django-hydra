/* eslint-disable  max-classes-per-file  */
import { useRouter } from 'next/router';

import Loading from 'components/Loading';
import { useIsAuthenticated, useCurrentUserIsValidating } from 'models/user';
import { URLS } from 'constants.js';
import isServer from 'util/isServer';
import axios from 'util/axios';
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
  axios.defaults.headers = ctx.req.headers;
  axios.defaults.headers.accept = 'application/json, text/plain, */*';

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

export function postLoginUrl(router) {
  // TODO: next should preserve querystring args
  let { next = '/' } = router.query; // TODO should be setting controlled
  if (!next.startsWith('/')) {
    next = `/${next}`;
  }
  return next;
}

async function wrapContextUser(ctx) {
  forwardRequestHeaders(ctx);
  let response;
  try {
    response = await axios({
      method: 'get',
      url: URLS.usersMe,
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

const wrappedGetInitialProps = (func, loginRequired) => {
  if (func === undefined) {
    // eslint-disable-next-line no-param-reassign
    func = async () => {
      return {};
    };
  }
  return async ctx => {
    if (isServer() === true) {
      let user = null;
      try {
        user = await wrapContextUser(ctx);
      } catch (e) {
        if (e instanceof NotLoggedInError) {
          if (loginRequired === true) {
            ctx.res.writeHead(302, {
              Location: loginPageUrl(ctx.req.url),
            });
            ctx.res.end();
            return {};
          }
        }
        if (e instanceof ServerDownError || e instanceof ServerBrokenError) {
          throw e; // TODO: handle this case better
        }
      }
      return func(ctx).then(pageProps => {
        const newPageProps = { ...pageProps };
        newPageProps.user = user;
        return newPageProps;
      });
    }
    return func(ctx);
  };
};

export const withAuthRequired = WrappedComponent => {
  const Wrapper = props => {
    const isAuthenticated = useIsAuthenticated();
    const isValidating = useCurrentUserIsValidating();
    const router = useRouter();

    if (!isAuthenticated) {
      if (isServer()) {
        return async ctx => {
          ctx.res.writeHead(302, {
            Location: loginPageUrl(ctx.req.url),
          });
        };
      }
      router.push(loginPageUrl(router.pathname));
      return <Loading />;
    }

    if (isValidating) return <Loading />;
    return <WrappedComponent {...props} />;
  };
  Wrapper.getInitialProps = wrappedGetInitialProps(
    WrappedComponent.getInitialProps,
    true
  );
  return Wrapper;
};

export const withAuth = WrappedComponent => {
  const Wrapper = props => {
    return <WrappedComponent {...props} />;
  };
  Wrapper.getInitialProps = wrappedGetInitialProps(
    WrappedComponent.getInitialProps,
    false
  );
  return Wrapper;
};

export const withoutAuth = WrappedComponent => {
  const Wrapper = props => {
    const isAuthenticated = useIsAuthenticated();
    const router = useRouter();
    if (isAuthenticated) {
      router.push(postLoginUrl(router));
    }
    return <WrappedComponent {...props} />;
  };
  return Wrapper;
};
