import { TextField, TextFieldProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

export type UITextFieldProps = Omit<TextFieldProps, 'variant' | 'color' | 'size' | 'fullWidth' | 'size'>;

const useStyles = makeStyles(() => ({
    withoutLabel: {
        paddingTop: 18.5,
        paddingBottom: 18.5
    }
}));

export const UITextField: React.FC<UITextFieldProps> = ({ InputProps, ...rest }) => {

    const classes = useStyles();

    const inputClass = clsx({
        [ classes.withoutLabel ]: !rest.label
    });

    return <TextField
        variant='filled'
        fullWidth
        size='small'
        InputProps={{
            ...InputProps,
            classes: {
                ...InputProps?.classes,
                input: inputClass
            }
        }}
        {...rest}
    />;
};
