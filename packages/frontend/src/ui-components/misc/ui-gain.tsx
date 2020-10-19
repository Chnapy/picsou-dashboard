import React from 'react';
import { switchUtil } from '../../util/util';
import { gainUnitContext } from '../contexts/gain-unit-context';
import { UITypography, UITypographyProps } from '../typography/ui-typography';
import { UIEuroValue } from './ui-euro-value';
import { UISpacedNumber } from './ui-spaced-number';

export type UIGainProps = Omit<UITypographyProps, 'color' | 'children'> & {
    oldValue: number;
    newValue: number;
    children?: never;
};

export const UIGain: React.FC<UIGainProps> = ({
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

    const gainUnit = gainUnitContext.useValue();

    return switchUtil(gainUnit, {
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

    const percentValue = (diff / oldValue * 100) || 0;

    return <UITypography {...rest}>
        {prefix}<UISpacedNumber value={percentValue}/>%
    </UITypography>;
};
