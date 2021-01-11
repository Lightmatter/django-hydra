import { useState } from 'react';
import { Form, Field, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useSnackbar } from 'notistack';

import {
  Box,
  Typography,
  Button,
  Container,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import AccountPageHeader from 'components/AccountPageHeader';
import { deleteUser, DeleteUserSchema } from 'models/user';
import { withAuthRequired } from 'util/withAuth';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  bottomSpace: {
    marginBottom: theme.spacing(2),
  },
}));

const DeleteAccount = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container className={classes.paper} component="main" maxWidth="xs">
      <AccountPageHeader>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
      </AccountPageHeader>
      <Typography component="h1" variant="h5" className={classes.bottomSpace}>
        Delete your account?
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Formik
          initialValues={% raw -%}{{ currentPassword: '' }}{% endraw %}
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
              .then(() => {
                enqueueSnackbar('Goodbye!', {
                  variant: 'info',
                });
              })
              .catch(error => {
                actions.setSubmitting(false);
                if (error.nonFieldErrors) {
                  enqueueSnackbar(error.nonFieldErrors, {
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
              Really delete your account?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete your account? We'll miss you!
              </DialogContentText>
              <Box display="flex" justifyContent="center">
                <Field
                  component={TextField}
                  name="currentPassword"
                  autoComplete="off"
                  label="Current Password"
                  type="password"
                />
              </Box>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} color="secondary" autoFocus>
                No - I want to stay!
              </Button>
              <Button variant="outlined" type="submit" color="primary">
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
