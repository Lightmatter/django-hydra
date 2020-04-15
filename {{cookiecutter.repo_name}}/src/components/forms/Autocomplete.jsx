import './Styles.scss';

import { FormControl, FormHelperText, TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Autocomplete } from '@material-ui/lab';
import { useField, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';

const FormikAutocomplete = ({
    callback,
    textFieldProps,
    inputProps,
    formControlClassName = '',
    ...props
}) => {
    const { setFieldValue, setTouched } = useFormikContext();
    const [field, meta] = useField(props);
    const isError = Boolean((meta.touched && meta.error) || meta.initialError);
    const helperText = props.helperText;
    delete props.helperText;

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await callback();
            const callbackOptions = await response.data;

            if (active) {
                setOptions(callbackOptions);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, callback]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <FormControl
            error={isError}
            className={`${formControlClassName} autocomplete-formik-field`}
        >
            <Autocomplete
                open={open}
                {...props}
                {...field}
                options={options}
                onChange={(_, value) => setFieldValue(field.name, value)}
                onBlur={() => setTouched({ [field.name]: true })}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                renderInput={params => (
                    <TextField
                        {...params}
                        {...textFieldProps}
                        fullWidth
                        helperText={helperText}
                        error={isError}
                        InputProps={{
                            ...params.InputProps,
                            ...inputProps,
                            endAdornment: (
                                <>
                                    {loading ? (
                                        <CircularProgress color="inherit" size={20} />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
            {isError && <FormHelperText>{meta.error || meta.initialError}</FormHelperText>}
        </FormControl>
    );
};

export default FormikAutocomplete;
