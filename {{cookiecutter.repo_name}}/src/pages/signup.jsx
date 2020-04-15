// import React from 'react';
// import Header from '../components/header.jsx';

// import { Form, Formik } from 'formik';
// import { registerUser } from 'models/user';
// import InputField from '../components/forms/InputField.jsx';
// import { useUser } from 'shared/hooks/user';
// import { SignupSchema } from '/models/user';

// const SignUp = () => {
//     const [user, fetchUser] = useUser();
//     const [, addAlert] = useAlertContext();

//     const DISCORD_ID = process.env.REACT_APP_DISCORD_ID;
//     const DISCORD_REDIRECT_URL = encodeURIComponent(
//         `${window.location.protocol}//${window.location.host}/discord-login`
//     );
//     const DISCORD_URL = `https://discordapp.com/api/oauth2/authorize?client_id=${DISCORD_ID}&redirect_uri=${DISCORD_REDIRECT_URL}&response_type=token&scope=identify%20email`;

//     return (
//         <>
//             <Grid container className="signup" align="center">
//                 <Grid item xs={12} className="login-signup-options">
//                     <Typography variant="h6">
//                         <Link to={AUTH_LOGIN}>Login</Link> or Sign Up
//                     </Typography>
//                 </Grid>
//                 <Grid item xs={12} className="login-signup-options discord">
//                     <Typography variant="h6">
//                         <span className="discord-or">or</span>
//                         <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
//                             Signup with Discord
//                         </a>
//                     </Typography>
//                 </Grid>
//                 <Grid item xs={8} className="login-signup-header">
//                     <h1>Register here, become a user!</h1>
//                     <p>
//                         Anim et e culpa officia, ingeniis amet sint ut magna ut multos iudicem
//                         tractavissent, se aliqua nescius. Arbitror iis arbitror, incurreret export.
//                     </p>
//                 </Grid>
//                 <Grid item xs={12} className="auth-form">
//                     <Formik
//                         initialValues={{ first_name: '', last_name: '', email: '' }}
//                         validateOnChange
//                         validationSchema={SignupSchema}
//                         onSubmit={(values, actions) => {
//                             setTimeout(() => {
//                                 registerUser(values)
//                                     .then(response => {
//                                         fetchUser();
//                                         addAlert({ msg: 'Successfully signed up' });
//                                         return response;
//                                     })
//                                     .then(response => {
//                                         actions.setSubmitting(false);
//                                         return response;
//                                     })
//                                     .catch(error => {
//                                         actions.setSubmitting(false);
//                                         if (error.non_field_errors) {
//                                             addAlert({
//                                                 msg: error.non_field_errors,
//                                                 severity: 'error',
//                                             });
//                                         } else {
//                                             actions.setErrors(error);
//                                         }
//                                     });
//                             });
//                         }}
//                     >
//                         <Form>
//                             <InputField
//                                 fullWidth
//                                 name="first_name"
//                                 type="text"
//                                 label="First Name"
//                                 placeholder="Enter First Name"
//                                 helperText="Or your last name in Japanese"
//                             />
//                             <InputField
//                                 fullWidth
//                                 name="last_name"
//                                 type="text"
//                                 label="Last Name"
//                                 placeholder="Enter Last Name"
//                                 helperText="Your ancestors will smile on you"
//                             />
//                             <InputField
//                                 fullWidth
//                                 name="email"
//                                 type="email"
//                                 label="Email"
//                                 placeholder="Enter Email Address"
//                                 helperText="Will keep this as secret as your K/D ratio"
//                             />
//                             <InputField
//                                 fullWidth
//                                 name="username"
//                                 type="text"
//                                 label="Username"
//                                 placeholder="Create Username"
//                                 helperText="Your handle"
//                             />

//                             <InputField
//                                 fullWidth
//                                 name="password1"
//                                 type="password"
//                                 label="Password"
//                                 placeholder="Create Password"
//                                 helperText="make the stars happy"
//                             />
//                             <InputField
//                                 fullWidth
//                                 name="password2"
//                                 type="password"
//                                 label="Confirm Password"
//                                 placeholder="Repeat Password"
//                                 helperText="make the stars just as happy as before"
//                             />

//                             <CustomButton variant="outlined" type="submit">
//                                 Submit
//                             </CustomButton>
//                         </Form>
//                     </Formik>
//                 </Grid>
//             </Grid>
//         </>
//     );
// };

// export default SignUp;
