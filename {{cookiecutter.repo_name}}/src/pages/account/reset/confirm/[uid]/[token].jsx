import { useRouter } from 'next/router';
import { Form, Field, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useSnackbar } from 'notistack';

import { Avatar, Button, Container, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import Link from 'components/router/Link';

import { ResetPassSchema, resetPass } from 'models/user';

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

const PasswordResetConfirm = () => {
    const classes = useStyles();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const { uid, token } = router.query;
    return (
        <Container className={classes.paper} component="main" maxWidth="xs">
            <Avatar className={classes.avatar}>
                <VpnKeyIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Reset your password
            </Typography>
            <Formik
                {% raw -%}initialValues={{ new_password: '', re_new_password: '' }}{% endraw %}
                validateOnChange
                validationSchema={ResetPassSchema}
                onSubmit={(values, actions) => {
                    const newValues = { ...values };
                    setTimeout(() => {
                        newValues.uid = uid;
                        newValues.token = token;
                        resetPass(newValues)
                            .then(response => {
                                enqueueSnackbar('Successfully reset password', {
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
                                if (error.token) {
                                    enqueueSnackbar(error.token, {
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
                        name="new_password"
                        type="password"
                        component={TextField}
                        autoComplete="new-password"
                        label="Password"
                        placeholder="Password"
                    />
                    <Field
                        fullWidth
                        name="re_new_password"
                        type="password"
                        autoComplete="new-password"
                        component={TextField}
                        label="Repeat password"
                        placeholder="Repeat pasword"
                    />

                    <Button fullWidth variant="outlined" type="submit" className={classes.button}>
                        Reset my password
                    </Button>
                </Form>
            </Formik>
            <Grid container className={classes.text}>
                <Grid item xs>
                    <Link href="/login" variant="body2">
                        Changed your mind? Back to login
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PasswordResetConfirm;
