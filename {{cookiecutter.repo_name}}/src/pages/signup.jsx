import React from 'react';

import { Form, Field, Formik } from 'formik';
import { registerUser, SignupSchema, useUser } from 'models/user';

import Link from 'components/router/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';

const SignUp = () => {
    return (
        <>
            <Typography variant="h6">
                <Link href="/login">Login</Link> or Sign Up
            </Typography>
            <Typography variant="h1">Register here, become a user!</Typography>
            <Typography>Really excited to see you man!</Typography>
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    password1: '',
                    password2: '',
                }}
                validateOnChange
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        registerUser(values)
                            .then(response => {
                                addAlert({ msg: 'Successfully signed up' });
                                return response;
                            })
                            .then(response => {
                                actions.setSubmitting(false);
                                return response;
                            })
                            .catch(error => {
                                actions.setSubmitting(false);
                                if (error.non_field_errors) {
                                    addAlert({
                                        msg: error.non_field_errors,
                                        severity: 'error',
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
                        component={TextField}
                        name="first_name"
                        label="First Name"
                        placeholder="Enter First Name"
                        helperText="Or your last name in Japanese"
                    />
                    <Field
                        fullWidth
                        name="last_name"
                        component={TextField}
                        label="Last Name"
                        placeholder="Enter Last Name"
                        helperText="Your ancestors will smile on you"
                    />
                    <Field
                        fullWidth
                        name="email"
                        component={TextField}
                        type="email"
                        label="Email"
                        placeholder="Enter Email Address"
                        helperText="Will keep this as secret as your K/D ratio"
                    />
                    <Field
                        fullWidth
                        component={TextField}
                        name="password1"
                        type="password"
                        label="Password"
                        placeholder="Create Password"
                        helperText="make the stars happy"
                    />
                    <Field
                        fullWidth
                        component={TextField}
                        name="password2"
                        type="password"
                        label="Confirm Password"
                        placeholder="Repeat Password"
                        helperText="make the stars just as happy as before"
                    />
                    <Button variant="outlined" type="submit">
                        Submit
                    </Button>
                </Form>
            </Formik>
        </>
    );
};
SignUp.getInitialProps = async ctx => {
    debugger;
    return {};
};

export default SignUp;
