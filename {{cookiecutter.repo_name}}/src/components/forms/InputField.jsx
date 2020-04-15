import { FormControl, FormHelperText, InputLabel } from '@material-ui/core';
import FilledInput from '@material-ui/core/FilledInput';
import { useField } from 'formik';
import React from 'react';

const InputField = ({ label, fullWidth = false, formControlClassName = '', ...props }) => {
    const [field, meta] = useField(props);
    const isError = Boolean((meta.touched && meta.error) || meta.initialError);
    const helperText = props.helperText;
    delete props.helperText;

    return (
        <FormControl
            fullWidth={fullWidth}
            error={isError}
            className={formControlClassName}
            margin="dense"
        >
            <InputLabel variant={'filled'} htmlFor={props.name}>
                {label}
            </InputLabel>
            <FilledInput {...field} {...props} />
            {(isError || helperText) && (
                <FormHelperText>
                    {isError ? meta.error || meta.initialError : helperText}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default InputField;
