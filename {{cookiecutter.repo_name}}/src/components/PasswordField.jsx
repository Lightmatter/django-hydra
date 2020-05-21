import { useState } from 'react';
import { IconButton, InputAdornment } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

export default function PasswordField({ ...rest }) {
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
            {...rest}
            data-cy="password"
            {% raw -%}InputProps={{
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
}
