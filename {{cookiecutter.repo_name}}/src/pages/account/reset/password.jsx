import { useSnackbar } from 'notistack';

import { Form, Field, Formik } from 'formik';
import { TextField } from 'formik-material-ui';

import { Avatar, Button, Container, Typography, Grid } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'components/router/Link';

import { ForgotPassSchema, forgotPass } from 'models/user';

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: theme.spacing(8),
    },
    button: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

const ForgotPassPage = () => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    return (
        <Container className={classes.paper} component="main" maxWidth="xs">
            <Avatar className={classes.avatar}>
                <HelpOutlineIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Forgot your password? No problem.
            </Typography>
            <Typography variant="caption" align="center">
                Enter your email below, and if you have an account with us we'll send you a link to
                reset your password.
            </Typography>

            <Formik
                {% raw -%}initialValues={{ email: '' }}{% endraw %}
                validateOnChange
                validationSchema={ForgotPassSchema}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        forgotPass(values)
                            .then(response => {
                                enqueueSnackbar('Successfully sent forgot password link', {
                                    variant: 'success',
                                });
                                return response;
                            })
                            .then(response => {
                                actions.setSubmitting(false);
                                return response;
                            })
                            .catch(error => {
                                actions.setSubmitting(false);
                                if (error.non_field_errors) {
                                    enqueueSnackbar(error.non_field_errors, {
                                        variant: 'error',
                                    });
                                } else {
                                    actions.setErrors(error);
                                }
                            });
                    });
                }}
            >
                <Form>
                    <Field
                        fullWidth
                        name="email"
                        component={TextField}
                        autoComplete="email"
                        label="Email"
                        placeholder="Enter Email"
                    />
                    <Button fullWidth variant="outlined" type="submit" className={classes.button}>
                        Email me a link to reset password
                    </Button>
                </Form>
            </Formik>
            <Grid container className={classes.text}>
                <Grid item xs>
                    <Link href="/login" variant="body2">
                        Back to login
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/signup" variant="body2">
                        Don't have an account? Sign Up
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ForgotPassPage;
