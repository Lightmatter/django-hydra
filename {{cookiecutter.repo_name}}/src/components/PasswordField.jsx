import { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, InputAdornment } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

const PasswordField = ({ dataCy, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
    <Field
      component={TextField}
      type={showPassword ? 'text' : 'password'}
      data-cy={dataCy}
      {...rest}
    {%- raw %}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}{%- endraw %}
    />
  );
};

PasswordField.propTypes = {
  dataCy: PropTypes.string,
};

PasswordField.defaultProps = {
  dataCy: 'password',
};

export default PasswordField;
