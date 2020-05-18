import * as Sentry from '@sentry/node';
import isServer from 'util/isServer';

/**
 * Initialize Sentry and export it.
 *
 * Helper to avoid duplicating the init() call in every /pages/api file.
 * Also used in pages/_app for the client side, which automatically applies it for all frontend pages.
 */
Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    enabled: process.env.NODE_ENV !== 'test',
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
    release: process.env.NEXT_PUBLIC_APP_VERSION_RELEASE,
});

if (!process.env.NEXT_PUBLIC_SENTRY_DSN && process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.error('Sentry DSN not defined');
}

// Scope configured by default, subsequent calls to "configureScope" will add additional data
Sentry.configureScope(scope => {
    // See https://www.npmjs.com/package/@sentry/node
    scope.setTag('nodejs', process.version);
    scope.setTag('runtimeEngine', isServer() ? 'server' : 'browser');
    scope.setTag('buildTime', process.env.BUILD_TIME);
});

/**
 * Configure the Sentry scope by extracting useful tags and context from the given request.
 *
 * @param req
 */
export const configureReq = req => {
    Sentry.configureScope(scope => {
        scope.setTag('host', req?.headers?.host);
        scope.setTag('url', req?.url);
        scope.setTag('method', req?.method);
        scope.setContext('query', req?.query);
        scope.setContext('cookies', req?.cookies);
        scope.setContext('body', req?.body);
        scope.setContext('headers', req?.headers);
    });
};

export default Sentry;
