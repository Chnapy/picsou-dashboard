import React from 'react';
import { UITypography, UITypographyProps } from '../typography/ui-typography';

export type UIEuroValueProps = Omit<UITypographyProps, 'children'> & {
    value: number;
    prefix?: string;
    children?: never;
};

export const UIEuroValue: React.FC<UIEuroValueProps> = ({
    value,
    prefix,
    ...rest
}) => {
    return <UITypography {...rest}>
        {prefix}{value.toFixed(2)}€
    </UITypography>
};
