import { Typography, TypographyProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Variant } from '@material-ui/core/styles/createTypography';
import clsx from 'clsx';
import React from 'react';
import { switchUtil } from '../../util/util';

type UITypographyVariant = Extract<Variant, 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2'>
    | 'labelMini';

type UITypographyColor = 'default' | 'primary' | 'positive' | 'negative' | 'zero';

export type UITypographyProps = Omit<TypographyProps, 'variant' | 'color'> & {
    variant: UITypographyVariant;
    color?: UITypographyColor;
    disabled?: boolean;
    component?: React.ReactType;
};

const useStyles = makeStyles(({ palette }) => ({
    root: ({
        color, disabled
    }: Pick<UITypographyProps, 'color' | 'disabled'>) => ({
        color: switchUtil(color ?? 'none', {
            none: undefined,
            default: palette.text.primary,
            primary: palette.primary.main,
            positive: palette.progress.positive,
            negative: palette.progress.negative,
            zero: palette.progress.zero,
        }),
        opacity: disabled ? 0.5 : undefined,
    }),
    labelMini: {
        fontSize: '1rem',
        textTransform: 'uppercase',
        fontWeight: 600
    }
}));

export const UITypography: React.FC<UITypographyProps> = ({
    variant,
    color,
    disabled,
    className,
    ...rest
}) => {

    const classes = useStyles({ color, disabled });

    const defaultClassName = clsx(classes.root, className);

    if (variant === 'labelMini') {
        return <Typography {...rest} className={clsx(classes.labelMini, defaultClassName)} variant='body2' />;
    }

    return <Typography {...rest} className={defaultClassName} variant={variant} />;
};
