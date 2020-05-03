import React from 'react';

import { Form, Field, Formik } from 'formik';
import { registerUser, logIn, SignupSchema } from 'models/user';

import Link from 'components/router/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField, CheckboxWithLabel } from 'formik-material-ui';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useSnackbar } from 'notistack';
import { withoutAuth } from 'util/withAuth';

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(4),
    },
    grid: {
        marginBottom: theme.spacing(1),
    },
    bottomSpace: {
        marginBottom: theme.spacing(2),
    },
}));

const SignUp = () => {
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    return (
        <Container className={classes.paper} component="main" maxWidth="xs">
            <Avatar>
                <EmojiPeopleIcon />
            </Avatar>
            <Typography variant="h1" variant="h5">
                Register here, become a user!
            </Typography>
            <Formik
                {% raw -%}initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    re_password: '',
                    tos: false,
                }}{% endraw %}
                className={classes.form}
                validateOnChange
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        registerUser(values)
                            .then(response => {
                                const login_promise = logIn(values);
                                return login_promise;
                            })
                            .then(response => {
                                //TODO: This should probably make a different message if you're actually a returning user
                                // with good creds, since you're not actually registering in that case.
                                enqueueSnackbar('Successfully registered!', {
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
                    <Grid container spacing={2} className={classes.grid}>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={TextField}
                                name="first_name"
                                label="First Name"
                                data-cy="first-name"
                                autoComplete="given-name"
                                placeholder="Enter First Name"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field
                                name="last_name"
                                component={TextField}
                                data-cy="last-name"
                                label="Last Name"
                                autoComplete="family-name"
                                placeholder="Enter Last Name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                fullWidth
                                name="email"
                                component={TextField}
                                data-cy="email"
                                type="email"
                                label="Email"
                                autoComplete="email"
                                placeholder="Enter Email Address"
                                helperText="We promise not to spam you"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Field
                                fullWidth
                                component={TextField}
                                name="password"
                                type="password"
                                data-cy="password"
                                autoComplete="new-password"
                                label="Password"
                                placeholder="Create Password"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Field
                                fullWidth
                                component={TextField}
                                name="re_password"
                                data-cy="re-password"
                                autoComplete="new-password"
                                type="password"
                                label="Confirm Password"
                                placeholder="Repeat Password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                component={CheckboxWithLabel}
                                name="tos"
                                data-cy="tos"
                                type="checkbox"
                                {% raw -%}Label={{
                                    label: (
                                        <>
                                            You accept our{' '}
                                            <Link target="_blank" href="/terms">
                                                TOS (opens in new tab)
                                            </Link>
                                        </>
                                    ),
                                }}
                            />{%- endraw %}
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="outlined"
                        type="submit"
                        data-cy="submit-signup"
                        className={classes.bottomSpace}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </Container>
    );
};

export default withoutAuth(SignUp);
