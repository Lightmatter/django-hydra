import { Form, Field, Formik } from 'formik';
import { useSnackbar } from 'notistack';

import { Typography, Button, Container, Grid } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import Avatar from '@material-ui/core/Avatar';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';

import AccountPageHeader from 'components/AccountPageHeader';
import { withAuthRequired } from 'util/withAuth';
import { changeEmail, ChangeEmailSchema } from 'models/user';

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

// NOTE: that technically this is change username.

const ChangeEmail = () => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    return (
        <Container className={classes.paper} component="main" maxWidth="xs">
            <AccountPageHeader>
                <Avatar>
                    <EmailIcon />
                </Avatar>
            </AccountPageHeader>
            <Typography
              component="h1"
              variant="h5"
              className={classes.bottomSpace}
            >
                Change your Email
            </Typography>
            <Formik
                initialValues={%raw-%}{{
                    current_password: '',
                    new_email: '',
                    re_new_email: ''
                }}{%endraw%}
                className={classes.form}
                validateOnChange
                validationSchema={ChangeEmailSchema}
                onSubmit={(values, actions) => {
                    changeEmail(values)
                        .then(response => {
                            enqueueSnackbar('Successfully changed Email!', {
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
                        <Grid item xs={12}>
                            <Field
                                fullWidth
                                component={TextField}
                                name="current_password"
                                autoComplete="current-password"
                                label="Current Password"
                                type="password"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Field
                                fullWidth
                                name="new_email"
                                component={TextField}
                                autoComplete="email"
                                type="email"
                                label="New Email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                                fullWidth
                                name="re_new_email"
                                component={TextField}
                                autoComplete="email"
                                type="email"
                                label="Repeat New Email"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="outlined"
                        type="submit"
                        className={classes.bottomSpace}
                    >
                        Update Email
                    </Button>
                </Form>
            </Formik>
        </Container>
    );
};
export default withAuthRequired(ChangeEmail);
