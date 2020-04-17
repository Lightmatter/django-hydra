import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import theme from 'theme/theme';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Form, Field, Formik } from 'formik';

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: theme.spacing(8),
    },
}));

const logIn = () => {
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
            ></Formik>
        </Container>
    );
};

export default logIn;
