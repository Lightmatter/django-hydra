import { Form, Field, Formik } from 'formik';
import { useSnackbar } from 'notistack';

import { Typography, Button, Container, Grid, Avatar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';

import AccountPageHeader from 'components/AccountPageHeader';
import { changePass, ChangePassSchema } from 'models/user';
import { withAuthRequired } from 'util/withAuth';

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

const ChangePassword = () => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    return (
        <Container className={classes.paper} component="main" maxWidth="xs">
            <AccountPageHeader>
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
            </AccountPageHeader>
            <Typography
                component="h1"
                variant="h5"
                className={classes.bottomSpace}
            >
                Change your password
            </Typography>
            <Formik
                initialValues={% raw -%}{{
                    current_password: '',
                    new_password: '',
                    re_new_password: '',
                }}{% endraw %}
                className={classes.form}
                validateOnChange
                validationSchema={ChangePassSchema}
                onSubmit={(values, actions) => {
                    changePass(values)
                        .then(response => {
                            enqueueSnackbar('Successfully changed password!', {
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
                }}
            >
                <Form>
                    <Grid container spacing={2} className={classes.grid}>
                        <Grid item xs={12} sm={12}>
                            <Field
                                fullWidth
                                component={TextField}
                                name="current_password"
                                autoComplete="current-password"
                                label="Current Password"
                                type="password"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Field
                                fullWidth
                                name="new_password"
                                component={TextField}
                                autoComplete="new-password"
                                type="password"
                                label="New password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                fullWidth
                                name="re_new_password"
                                component={TextField}
                                type="password"
                                autoComplete="new-password"
                                label="Repeat New password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="outlined"
                        type="submit"
                        className={classes.bottomSpace}
                    >
                        Update Password
                    </Button>
                </Form>
            </Formik>
        </Container>
    );
};
export default withAuthRequired(ChangePassword);
