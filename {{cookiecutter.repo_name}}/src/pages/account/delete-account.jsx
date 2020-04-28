import React from 'react';
import { withAuthRequired } from 'util/withAuth';
import { deleteUser, DeleteUserSchema } from 'models/user';
import { Form, Field, Formik } from 'formik';
import { TextField } from 'formik-material-ui';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSnackbar } from 'notistack';

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

const DeleteAccount = () => {
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDeleteAccount = () => {};

    return (
        <Container className={classes.paper} component="main" maxWidth="xs">
            <Avatar>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h1" variant="h5">
                Delete your account?
            </Typography>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Formik
                    initialValues={% raw -%}{{ current_password: '' }}{% endraw %}
                    className={classes.form}
                    validateOnChange
                    validationSchema={DeleteUserSchema}
                    onSubmit={(values, actions) => {
                        deleteUser(values)
                            .then(response => {
                                actions.setSubmitting(false);
                                setOpen(false);
                                return response;
                            })
                            .then(response => {
                                enqueueSnackbar('Goodbye!', {
                                    variant: 'info',
                                });
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
                        <DialogTitle id="alert-dialog-title">
                            {'Really delete your account?'}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete your account? We'll miss you!
                            </DialogContentText>
                        </DialogContent>
                        <Field
                            component={TextField}
                            name="current_password"
                            autoComplete="off"
                            label="Current Password"
                            type="password"
                        />
                        <DialogActions>
                            <Button onClick={handleClose} color="primary" autoFocus>
                                No - I want to stay!
                            </Button>
                            <Button type="submit" color="primary">
                                Yes - I want to delete my account
                            </Button>
                        </DialogActions>
                    </Form>
                </Formik>
            </Dialog>
            <Button
                fullWidth
                variant="outlined"
                onClick={handleClickOpen}
                className={classes.bottomSpace}
            >
                Delete my account
            </Button>
        </Container>
    );
};
export default withAuthRequired(DeleteAccount);
