/* eslint-disable  max-classes-per-file */
import * as Sentry from '@sentry/node';
import 'util/sentry';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, Grid } from '@material-ui/core';
import Router from 'next/router';
import { SnackbarProvider } from 'notistack';
import NProgress from 'nprogress';

import theme from 'theme/theme';
import { CurrentUserProvider, USER_ME } from 'models/user';
import { clientBaseURL } from 'util/axios';
import isServer from 'util/isServer';

import Header from 'components/Header';
import Footer from 'components/Footer';

NProgress.configure({ parent: '#container' });

Router.events.on('routeChangeStart', url => {
    console.log(`Loading: ${url}`);
    NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const useStyles = makeStyles({
    Footer: {
        marginTop: 'auto',
    },

    Site: {
        'min-height': '100vh',
    },
});

const debugForceIP = () => {
    if (
        process.env.NEXT_PUBLIC_DEBUG &&
        !isServer() &&
        window.location.hostname === 'localhost'
    ) {
        window.location = `http://127.0.0.1:3000${window.location.pathname}`;
    }
};

const fileLabel = 'pages/_app';
export default function App(props) {
    debugForceIP();
    const { Component, pageProps } = props;
    const classes = useStyles();

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    const { user } = pageProps;
    Sentry.addBreadcrumb({
        // See https://docs.sentry.io/enriching-error-data/breadcrumbs
        category: fileLabel,
        message: `Preparing app (${isServer() ? 'server' : 'browser'})`,
        level: Sentry.Severity.Debug,
    });

    return (
        <>
            <Head>
                <title>Lightmatter!</title>
                {!user ? (
                    <link
                        rel="preload"
                        href={clientBaseURL + USER_ME}
                        as="fetch"
                        crossOrigin="use-credentials"
                    />
                ) : null}
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <SnackbarProvider>
                    <CurrentUserProvider initialUser={user}>
                        <Grid
                            container
                            direction="column"
                            className={classes.Site}
                        >
                            <Header />
                            <div id="container">
                                <Component {...pageProps} />
                            </div>
                            <Footer className={classes.Footer} />
                        </Grid>
                    </CurrentUserProvider>
                </SnackbarProvider>
            </ThemeProvider>
        </>
    );
}

if (process.browser && process.env.NEXT_PUBLIC_ENVIRONMENT === 'production') {
    const svg = `<svg width="55px" height="55px" viewBox="-5 0 60 55" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<style type="text/css">
  #lightmatter-logo{
    transform-origin: center center;
    animation-name: bounce;
    animation-duration: 720ms;
    animation-timing-function: cubic-bezier(.25,.72,.15,1.17);
    animation-iteration-count: infinite;
  }
  @keyframes bounce {
    0%, 50%, 100% {
      transform:
        rotate3d(0, 0, 0, 0deg)
        translate3d(0, 5px, 0);
    }
    20% {
      transform:
        rotate3d(0, 0, 1, 4deg)
        translate3d(0, 0, 0);
    }
    70% {
      transform:
        rotate3d(0, 0, 1, -4deg)
        translate3d(0, 0, 0);
    }
  }
</style>
      <title>Lightmatter</title>
      <desc>We build ambitious digital products.</desc>
      <g id="lightmatter-logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-69.000000, -29.000000)">
          <g >
            <g transform="translate(69.000000, 29.000000)">
              <polygon id="Fill-1" fill="#FFFFFF" points="0 0 0 50 50 50 50 40.1547886 9.77957875 40.1547886 9.77957875 0"></polygon>
              <polygon id="Fill-2" fill="#EB3033" points="29 20.5882353 49.5882353 20.5882353 49.5882353 0 29 0"></polygon>
            </g>
          </g>
        </g>
      </g>
    </svg>`;
    const svgDataUrl = `data:image/svg+xml;base64,${btoa(svg)}`;
    // eslint-disable-next-line no-console
    console.log(
        '%c ',
        `
  background-color: black;
  background-image: url(${svgDataUrl});
  padding-bottom: 100px;
  padding-left: 100px;
  margin: 20px;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
`
    );
    // eslint-disable-next-line no-console
    console.log(
        '%c Built by Lightmatter. Reach out to us at hello@lightmatter.com',
        'color:#E33942;font-family:avenir;font-size:1.27rem'
    );
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    pageProps: PropTypes.object.isRequired,
};
