import {
  Button,
  Container,
  FormControlLabel,
  Grid,
  Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import { useSnackbar } from 'notistack';

import { Form, Field, Formik } from 'formik';
import { TextField, Checkbox } from 'formik-material-ui';

import AccountPageHeader from '{{cookiecutter.repo_name}}/src/components/AccountPageHeader';
import { LoginSchema, logIn } from '{{cookiecutter.repo_name}}/src/models/user';
import { postLoginUrl, withoutAuth } from '{{cookiecutter.repo_name}}/src/util/withAuth';
import Link from '{{cookiecutter.repo_name}}/src/components/router/Link';
import PasswordField from '{{cookiecutter.repo_name}}/src/components/PasswordField';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: theme.spacing(2),
  },
  text: {
    paddingTop: theme.spacing(2),
  },
  bottomSpace: {
    marginBottom: theme.spacing(2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  return (
    <Container className={classes.paper} component="main" maxWidth="xs">
      <AccountPageHeader>
        <img src="placeholder.png" width="100%" alt="placeholder" />
      </AccountPageHeader>
      <Typography component="h1" variant="h5">
        Log In
      </Typography>
      <Formik
        {% raw -%}initialValues={{ email: '', password: '', rememberMe: true }}{% endraw %}
        validateOnChange
        validationSchema={LoginSchema}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            logIn(values)
              .then(response => {
                actions.setSubmitting(false);
                router.push(postLoginUrl(router.query));
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
          });
        }}
      >
        <Form>
          <Field
            fullWidth
            name="email"
            component={TextField}
            type="email"
            data-cy="login-email"
            label="Email"
            autoComplete="email"
            margin="dense"
          />
          <PasswordField
            fullWidth
            name="password"
            label="Password"
            autoComplete="current-password"
            dataCy="login-password"
            placeholder="Enter Password"
            margin="dense"
          />
          <Grid container alignItems="center" className={classes.text}>
            <Grid item>
              <FormControlLabel
                label="Remember me"
                control={
                  <Field
                    name="rememberMe"
                    type="checkbox"
                    component={Checkbox}
                  />
                }
              />
            </Grid>
            <Grid item xs align="right">
              <Link href="/account/reset/password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>

          <Button
            fullWidth
            data-cy="submit-login"
            variant="outlined"
            type="submit"
            className={classes.bottomSpace}
          >
            Log In
          </Button>
        </Form>
      </Formik>
      <Grid container className={classes.text} justify="flex-end">
        <Grid item>
          <Link href="/signup" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
export const getServerSideProps = withoutAuth();
