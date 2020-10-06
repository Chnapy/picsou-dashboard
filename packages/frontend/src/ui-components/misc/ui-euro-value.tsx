import React from 'react';
import { UITypography, UITypographyProps } from '../typography/ui-typography';
import { UISpacedNumber } from './ui-spaced-number';

export type UIEuroValueProps = Omit<UITypographyProps, 'children'> & {
    value: number;
    prefix?: string;
    children?: never;
};

export const UIEuroValue: React.FC<UIEuroValueProps> = ({
    value,
    prefix,
    ...rest
}) => (
        <UITypography {...rest}>
            {prefix}<UISpacedNumber value={value} />€
        </UITypography>
    );
