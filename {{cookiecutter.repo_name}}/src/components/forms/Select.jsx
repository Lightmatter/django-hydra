import './Styles.scss';

import { FormControl, FormHelperText, InputLabel, TextField } from '@material-ui/core';
import { useField } from 'formik';
import React from 'react';

const Select = ({ label, fullWidth = false, formControlClassName = '', children, ...props }) => {
    const [field, meta] = useField(props);
    const isError = Boolean((meta.touched && meta.error) || meta.initialError);
    const helperText = props.helperText;
    delete props.helperText;

    return (
        <FormControl
            fullWidth={fullWidth}
            error={isError}
            className={`${formControlClassName} select-form-field`}
            margin="dense"
        >
            <InputLabel
                variant={'filled'}
                className={field.value !== 'none' ? 'MuiInputLabel-shrink' : ''}
                htmlFor={props.name}
            >
                {label}
            </InputLabel>
            <TextField variant="filled" select {...field} {...props}>
                {children}
            </TextField>
            {(isError || helperText) && (
                <FormHelperText>
                    {isError ? meta.error || meta.initialError : helperText}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default Select;
