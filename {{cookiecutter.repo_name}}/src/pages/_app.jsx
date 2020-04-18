import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import theme from 'theme/theme';
import Router from 'next/router';

import { CurrentUserProvider } from 'models/user';
import axios from 'util/axios';

import NProgress from 'nprogress';
Router.events.on('routeChangeStart', url => {
    console.log(`Loading: ${url}`);
    NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

import Header from 'components/header.jsx';
import Footer from 'components/footer.jsx';

const useStyles = makeStyles(theme => ({
    Footer: {
        marginTop: 'auto',
    },
    Site: {
        'min-height': '100vh',
    },
}));

export default function App(props) {
    const { Component, pageProps } = props;
    const classes = useStyles(theme);
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    return (
        <React.Fragment>
            <Head>
                <title>Lightmatter!</title>
                <link rel="stylesheet" type="text/css" href="/nprogress.css" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <CurrentUserProvider>
                    <Grid container direction="column" className={classes.Site}>
                        <Header />
                        <Component {...pageProps} />
                        <Footer className={classes.Footer} />
                    </Grid>
                </CurrentUserProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
