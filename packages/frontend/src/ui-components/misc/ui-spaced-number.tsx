import { makeStyles } from '@material-ui/core';
import React from 'react';

type UISpacedNumberProps = {
    value: number;
};

const formatNumber = (value: number) => value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

const useStyles = makeStyles(() => ({
    root: {
        wordSpacing: '-0.25em',
    }
}));

export const UISpacedNumber: React.FC<UISpacedNumberProps> = ({ value }) => {
    const classes = useStyles();

    return <span className={classes.root}>{formatNumber(+value.toFixed(2))}</span>
};
