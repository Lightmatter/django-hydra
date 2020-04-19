import { useRouter } from 'next/router';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from 'components/router/Link';

import theme from 'theme/theme';
import { makeStyles } from '@material-ui/core/styles';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { Form, Field, Formik } from 'formik';
import { TextField, Checkbox } from 'formik-material-ui';

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
    const classes = useStyles(theme);
    const router = useRouter();
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
                initialValues={{ new_password: '', re_new_password: '' }}
                validateOnChange
                validationSchema={ResetPassSchema}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        values.uid = uid;
                        values.token = token;
                        resetPass(values)
                            .then(response => {
                                alert('Successfully reset password');
                                return response;
                            })
                            .then(response => {
                                actions.setSubmitting(false);
                                return response;
                            })
                            .catch(error => {
                                actions.setSubmitting(false);
                                if (error.token) {
                                    alert(error.token);
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
                        label="Password"
                        placeholder="Password"
                    />
                    <Field
                        fullWidth
                        name="re_new_password"
                        type="password"
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
