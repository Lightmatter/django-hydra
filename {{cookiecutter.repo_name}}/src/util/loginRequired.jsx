import axios from 'util/axios';
import { USER_ME } from 'models/user';
import isServer from 'util/isServer';
//SAMPLE HEADERS coming in
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

//SAMPLE HEADERS COMING OUT
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

function forwardRequestCookies(ctx) {
    const cookie = ctx.req.headers.cookie;
    axios.defaults.headers.common['cookie'] = cookie;
    //what other headers do we want to forward?? probably x forwarded for
}

async function wrapContextUser(ctx) {
    forwardRequestCookies(ctx);
    let response;
    const res = ctx.res;
    try {
        response = await axios({
            method: 'get',
            url: USER_ME,
            headers: { Accept: '*/*' }, // as fetch for preload doesn't set accept correctly
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
    //do we need to forward status code??
    // should we care about vary??
    return response.data;
}

const loginRequired = func => {
    return async ctx => {
        if (isServer(ctx) == true) {
            try {
                const user = await wrapContextUser(ctx);
            } catch (e) {
                if (e instanceof NotLoggedInError) {
                    ctx.res.writeHead(302, { Location: `/login?next=${ctx.req.url}` });
                    ctx.res.end();
                    return {};
                }
                if (e instanceof ServerDownError || e instanceof ServerBrokenError) {
                    throw e; //TODO: handle this case better
                }
            }
            return func(ctx).then(pageProps => {
                pageProps['user'] = user;
                return pageProps;
            });
        } else {
            return func(ctx);
        }
    };
};
export default loginRequired;
