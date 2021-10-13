import { Form, Field, Formik } from 'formik';
import { useSnackbar } from 'notistack';

import { Typography, Button, Container, Grid } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import Avatar from '@material-ui/core/Avatar';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';

import AccountPageHeader from '{{cookiecutter.repo_name}}/src/components/AccountPageHeader';
import { withAuthRequired } from '{{cookiecutter.repo_name}}/src/util/withAuth';
import { changeEmail, ChangeEmailSchema } from '{{cookiecutter.repo_name}}/src/models/user';

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
      <Typography component="h1" variant="h5" className={classes.bottomSpace}>
        Change your Email
      </Typography>
      <Formik
        initialValues={%raw-%}{{
          currentPassword: '',
          newEmail: '',
          reNewEmail: '',
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
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={12}>
              <Field
                fullWidth
                component={TextField}
                name="currentPassword"
                autoComplete="current-password"
                label="Current Password"
                type="password"
              />
            </Grid>

            <Grid item xs={12}>
              <Field
                fullWidth
                name="newEmail"
                component={TextField}
                autoComplete="email"
                type="email"
                label="New Email"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                fullWidth
                name="reNewEmail"
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

export default ChangeEmail;
export const getServerSideProps = withAuthRequired();
