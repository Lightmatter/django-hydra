import './Styles.scss';

import DateFnsUtils from '@date-io/date-fns';
import { FormControl } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useField, useFormikContext } from 'formik';
import React from 'react';

// This component is meant to be used in a Formik form
const DatePickerField = ({ fullWidth = false, formControlClassName = '', ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    const isError = Boolean((meta.touched && meta.error) || meta.initialError);
    const helperText = props.helperText;
    delete props.helperText;

    return (
        <FormControl
            fullWidth={fullWidth}
            error={isError}
            className={`${formControlClassName} date-picker-formik-field`}
            margin="dense"
        >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    {...field}
                    {...props}
                    inputVariant="filled"
                    openTo="year"
                    onChange={val => {
                        setFieldValue(field.name, val);
                    }}
                />
            </MuiPickersUtilsProvider>
            {(isError || helperText) && (
                <FormHelperText>
                    {isError ? meta.error || meta.initialError : helperText}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default DatePickerField;
