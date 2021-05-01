import { withAuthRequired } from '{{cookiecutter.repo_name}}/src/util/withAuth';
import { Form, Field, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { useSnackbar } from 'notistack';

import { Grid, Button, Container, Avatar, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

import AccountPageHeader from '{{cookiecutter.repo_name}}/src/components/AccountPageHeader';
import {
  updateUser,
  ProfileSchema,
  useCurrentUser,
  useMutateCurrentUser,
} from '{{cookiecutter.repo_name}}/src/models/user';

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

const EditProfile = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const me = useCurrentUser();
  const mutate = useMutateCurrentUser();
  return (
    <Container className={classes.paper} component="main" maxWidth="xs">
      <AccountPageHeader>
        <Avatar>
          <AccountCircleIcon />
        </Avatar>
      </AccountPageHeader>
      <Typography component="h1" variant="h5" className={classes.bottomSpace}>
        Update your profile
      </Typography>
      {me ? (
        <Formik
          {% raw -%}initialValues={{
            firstName: me.firstName,
            lastName: me.lastName,
          }}{% endraw %}
          className={classes.form}
          validateOnChange
          validationSchema={ProfileSchema}
          onSubmit={(values, actions) => {
            mutate(
              updateUser(values).then(data => data.data),
              false
            )
              .then(response => {
                enqueueSnackbar('Successfully updated profile!', {
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
              <Grid item xs={12} sm={6}>
                <Field
                  component={TextField}
                  name="firstName"
                  label="First Name"
                  placeholder="Enter First Name"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  name="lastName"
                  component={TextField}
                  label="Last Name"
                  placeholder="Enter Last Name"
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="outlined"
              type="submit"
              className={classes.bottomSpace}
            >
              Update profile
            </Button>
          </Form>
        </Formik>
      ) : (
        <div>Loading</div>
      )}
    </Container>
  );
};

export default EditProfile;
export const getServerSideProps = withAuthRequired();
