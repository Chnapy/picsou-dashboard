import { Typography, TypographyProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Variant } from '@material-ui/core/styles/createTypography';
import clsx from 'clsx';
import React from 'react';
import { switchUtil } from '../../util';

type UITypographyVariant = Extract<Variant, 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2'>
    | 'bodyMini'
    | 'labelMini'
    | 'numeric';

type UITypographyColor = 'default' | 'primary' | 'positive' | 'negative';

export type UITypographyProps = Omit<TypographyProps, 'variant'> & {
    variant: UITypographyVariant;
    color?: UITypographyColor;
    component?: React.ReactType;
};

const useStyles = makeStyles(({ palette }) => ({
    root: ({
        color
    }: Pick<UITypographyProps, 'color'>) => ({
        color: switchUtil(color ?? 'none', {
            none: undefined,
            default: palette.text.primary,
            primary: palette.primary.main,
            positive: palette.progress.positive,
            negative: palette.progress.negative,
        })
    }),
    bodyMini: {
        fontSize: '0.8rem'
    },
    labelMini: {
        fontSize: '0.8rem',
        textTransform: 'uppercase'
    },
    numeric: {
        fontFamily: '"monogram"',
        fontSize: '1.6rem'
    }
}));

export const UITypography: React.FC<UITypographyProps> = ({
    variant,
    className,
    ...rest
}) => {

    const classes = useStyles(rest);

    const defaultClassName = clsx(classes.root, className);

    if (variant === 'bodyMini') {
        return <Typography {...rest} className={clsx(classes.bodyMini, defaultClassName)} variant='body2' />;
    }

    if (variant === 'labelMini') {
        return <Typography {...rest} className={clsx(classes.labelMini, defaultClassName)} variant='body2' />;
    }

    if (variant === 'numeric') {
        return <Typography {...rest} className={clsx(classes.numeric, defaultClassName)} variant='body2' />;
    }

    return <Typography {...rest} className={defaultClassName} variant={variant} />;
};
