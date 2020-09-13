import React from 'react';
import { UITypography, UITypographyProps } from '../typography/ui-typography';
import { switchUtil } from '../../util/util';
import { UIEuroValue } from './ui-euro-value';

export type UIGainProps = Omit<UITypographyProps, 'color' | 'children'> & {
    gainVariant: 'euro' | 'percent';
    oldValue: number;
    newValue: number;
    children?: never;
};

export const UIGain: React.FC<UIGainProps> = ({
    gainVariant,
    oldValue,
    newValue,
    ...rest
}) => {

    const diff = newValue - oldValue;

    const isGain = diff >= 0;

    const prefix = (isGain && '+') || undefined;

    const finalProps: Omit<UITypographyProps, 'children'> = {
        ...rest,
        prefix,
        color: isGain ? 'positive' : 'negative'
    };

    return switchUtil(gainVariant, {
        euro: () => <UIEuroValue {...finalProps} value={diff} />,
        percent: () => <UIPercent {...finalProps} oldValue={oldValue} newValue={newValue} />
    })();
};

type UIPercentProps = Omit<UITypographyProps, 'children'> & {
    oldValue: number;
    newValue: number;
    prefix?: string;
    children?: never;
};

const UIPercent: React.FC<UIPercentProps> = ({
    oldValue,
    newValue,
    prefix,
    ...rest
}) => {
    const diff = newValue - oldValue;

    const percentValue = diff / oldValue * 100;

    return <UITypography {...rest}>
        {prefix}{percentValue.toFixed(2)}%
    </UITypography>;
};
