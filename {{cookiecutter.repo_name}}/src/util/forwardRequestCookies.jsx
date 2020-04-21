export default function forwardRequestCookies(ctx) {
    const cookie = ctx.req.headers.cookie;
    axios.defaults.headers.common['cookie'] = cookie;
    //what other headers do we want to forward?? probably x forwarded for
}
