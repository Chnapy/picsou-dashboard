import React from 'react';
import { switchUtil } from '../../util/util';
import { GainUnit, gainUnitContext } from '../contexts/gain-unit-context';
import { UITypography, UITypographyProps } from '../typography/ui-typography';
import { UIEuroValue } from './ui-euro-value';
import { UISpacedNumber } from './ui-spaced-number';

export type UIGainNumericData = {
    oldValue: number;
    newValue: number;
};

export type UIGainProps = Omit<UITypographyProps, 'color' | 'children'>
    & UIGainNumericData
    & {
        unit: GainUnit | 'auto';
        children?: never;
    };

export const UIGain: React.FC<UIGainProps> = ({
    unit,
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
        color: isGain ? (diff === 0 ? 'zero' : 'positive') : 'negative'
    };

    const gainUnitFromContext = gainUnitContext.useValue();

    const gainUnit = unit === 'auto' ? gainUnitFromContext : unit;

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
        {prefix}<UISpacedNumber value={percentValue} />%
    </UITypography>;
};
