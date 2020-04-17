import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import theme from 'theme/theme';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Form, Field, Formik } from 'formik';
import { TextField } from 'formik-material-ui';

import { LoginSchema, logIn } from 'models/user';

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: theme.spacing(8),
    },
}));

const LogInPage = () => {
    const classes = useStyles(theme);
    return (
        <Container className={classes.paper} component="main" maxWidth="xs">
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Formik
                initialValues={{ email: '' }}
                validateOnChange
                validationSchema={LoginSchema}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        logIn(values)
                            .then(response => {
                                alert('Successfully logged in');
                                return response;
                            })
                            .then(response => {
                                actions.setSubmitting(false);
                                return response;
                            })
                            .catch(error => {
                                actions.setSubmitting(false);
                                if (error.non_field_errors) {
                                    alert(error.non_field_errors);
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
                    <Button variant="outlined" type="submit">
                        Log In
                    </Button>
                </Form>
            </Formik>
        </Container>
    );
};

export default LogInPage;
