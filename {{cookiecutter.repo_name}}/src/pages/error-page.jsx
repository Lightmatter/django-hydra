import { Box, Button, Container, Grid, Typography } from '@material-ui/core';

import { useSnackbar } from 'notistack';
import { withoutAuth } from 'util/withAuth';
import axios from 'util/axios';

const ErrorPage = () => {
    const { enqueueSnackbar } = useSnackbar();

    const handleClientError = () => {
        const url = '/backend/error/';

        return axios
            .get(url)
            .then(() => {})
            .catch(error => {
                enqueueSnackbar(error.non_field_errors, {
                    variant: 'error',
                });
            });
    };

    const handleServerError = () => {
        window.location = '/error-page?server=true';
    };

    return (
        <Container component="main" maxWidth="md">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                m={4}
            >
                <Typography variant="h5" component="h1">
                    Trigger a Sentry Error
                </Typography>
                <Grid container justify="space-around">
                    <Grid item xs={12} md={4} align="center">
                        <Button onClick={handleClientError} variant="outlined">
                            Trigger Client Side Error
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4} align="center">
                        <Button onClick={handleServerError} variant="outlined">
                            Trigger Server Side Error
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export async function getServerSideProps(context) {
    const { req } = context;
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.search === '?server=true') {
        await axios.get('/backend/error/');
    }
    return { props: {} };
}

export default withoutAuth(ErrorPage);
