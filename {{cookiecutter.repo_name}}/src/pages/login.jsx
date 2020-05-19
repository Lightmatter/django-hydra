import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    FormControlLabel,
    Grid,
    Paper,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

import theme from 'theme/theme';
import { Form, Field, Formik } from 'formik';
import { TextField, Checkbox } from 'formik-material-ui';

import { LoginSchema, logIn } from 'models/user';
import { withoutAuth } from 'util/withAuth';
import Link from 'components/router/Link';
import PasswordField from 'components/PasswordField';

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: theme.spacing(8),
    },
    text: {
        paddingTop: theme.spacing(2),
    },
    bottomSpace: {
        marginBottom: theme.spacing(2),
    },
}));

const LogInPage = () => {
    const classes = useStyles(theme);
    const router = useRouter();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    return (
        <Container className={classes.paper} component="main" maxWidth="xs">
            <Box width="200px" mb={2}>
                <img src="placeholder.png" width="100%" alt="placeholder" />
            </Box>
            <Typography component="h1" variant="h5">
                Log In
            </Typography>
            <Formik
                initialValues={{ email: '', password: '', remember_me: true }}
                validateOnChange
                validationSchema={LoginSchema}
                validateOnBlur={false}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        logIn(values)
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
                        type="email"
                        data-cy="login-email"
                        label="Email"
                        autoComplete="email"
                        margin="dense"
                    />
                    <PasswordField
                        fullWidth
                        name="password"
                        label="Password"
                        autoComplete="current-password"
                        placeholder="Enter Password"
                        margin="dense"
                    />
                    <Grid container alignItems="center" className={classes.text}>
                        <Grid item>
                            <FormControlLabel
                                label="Remember me"
                                control={
                                    <Field
                                        name="remember_me"
                                        type="checkbox"
                                        component={Checkbox}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs align="right">
                            <Link href="/account/reset/password" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>

                    <Button
                        fullWidth
                        data-cy="submit-login"
                        variant="outlined"
                        type="submit"
                        className={classes.bottomSpace}
                    >
                        Log In
                    </Button>
                </Form>
            </Formik>
            <Grid container classname={classes.text} justify="flex-end">
                <Grid item>
                    <Link href="/signup" variant="body2">
                        Don't have an account? Sign Up
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
};

export default withoutAuth(LogInPage);
