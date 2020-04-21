import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from 'components/router/Link';

import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

import theme from 'theme/theme';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Form, Field, Formik } from 'formik';
import { TextField, Checkbox } from 'formik-material-ui';

import { LoginSchema, logIn } from 'models/user';

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
}));

const LogInPage = () => {
    const classes = useStyles(theme);
    const router = useRouter();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    return (
        <Container className={classes.paper} component="main" maxWidth="xs">
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Formik
                {% raw -%}initialValues={{ email: '', password: '', remember_me: true }}{% endraw %}
                validateOnChange
                validationSchema={LoginSchema}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        logIn(values)
                            .then(response => {
                                enqueueSnackbar('Successfully logged in', {
                                    variant: 'success',
                                });
                                return response;
                            })
                            .then(response => {
                                actions.setSubmitting(false);
                                return response;
                            })
                            .then(response => {
                                const { next = '/' } = router.query; //TODO should be setting controlled
                                router.push(next);
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
                        label="Email"
                        placeholder="Enter Email"
                        helperText="That stands for electronic mail."
                    />
                    <Field
                        fullWidth
                        name="password"
                        type="password"
                        component={TextField}
                        label="Password"
                        placeholder="Enter Password"
                        helperText="Keep it secret, keep it safe"
                    />
                    <FormControlLabel
                        label="Remember me"
                        control={<Field name="remember_me" type="checkbox" component={Checkbox} />}
                    />
                    <Button fullWidth variant="outlined" type="submit">
                        Log In
                    </Button>
                </Form>
            </Formik>
            <Grid container className={classes.text}>
                <Grid item xs>
                    <Link href="/account/reset/password" variant="body2">
                        Forgot password?
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

export default LogInPage;
