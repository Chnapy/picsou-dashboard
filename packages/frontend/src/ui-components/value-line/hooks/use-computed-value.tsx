import { BoardValueInfos } from '@picsou/shared';
import React from 'react';
import { UIGainNumericData } from '../../misc/ui-gain';

type ValueToCompute = Pick<BoardValueInfos, 'oldValueList' | 'previousValue' | 'currentValue'>;

const getTotalValues = ({ oldValueList, currentValue, previousValue = currentValue }: ValueToCompute) => {
    const quantityTotal = oldValueList.reduce((acc, v) => acc + v.quantity, 0);

    const oldValueFull = oldValueList.reduce((acc, v) => acc + v.oldValue * v.quantity, 0);
    const currentValueFull = currentValue * quantityTotal;
    const previousValueFull = previousValue * quantityTotal;

    return {
        quantityTotal,
        oldValueFull,
        currentValueFull,
        previousValueFull
    };
};

export const useComputedValueTotal = (valueList: ValueToCompute[]) => {

    const { oldValueTotal, previousValueTotal, currentValueTotal } = valueList
        .map(getTotalValues)
        .reduce((acc, { oldValueFull, currentValueFull, previousValueFull }) => {
            acc.oldValueTotal += oldValueFull;
            acc.currentValueTotal += currentValueFull;
            acc.previousValueTotal += previousValueFull;

            return acc;
        }, {
            oldValueTotal: 0,
            currentValueTotal: 0,
            previousValueTotal: 0
        });

    return React.useMemo(() => ({
        oldValueTotal,
        previousValueTotal,
        currentValueTotal,
        getTotalGainProps: (): UIGainNumericData => ({
            oldValue: oldValueTotal,
            newValue: currentValueTotal
        }),
        getFromYesterdayTotalGainProps: (): UIGainNumericData => ({
            oldValue: previousValueTotal,
            newValue: currentValueTotal
        })
    }), [ oldValueTotal, previousValueTotal, currentValueTotal ]);
};

export const useComputedValue = (valueToCompute: ValueToCompute) => {
    const { previousValue, currentValue } = valueToCompute;
    const totalValues = getTotalValues(valueToCompute);

    const oldValueAverage = totalValues.oldValueFull / totalValues.quantityTotal;

    return {
        ...totalValues,
        oldValueAverage,
        getFullGainProps: (): UIGainNumericData => ({
            oldValue: totalValues.oldValueFull,
            newValue: totalValues.currentValueFull
        }),
        getValueGainProps: (): UIGainNumericData => ({
            oldValue: oldValueAverage,
            newValue: currentValue
        }),
        getFromYesterdayGainProps: (): UIGainNumericData => ({
            oldValue: previousValue ?? currentValue,
            newValue: currentValue
        }),
    }
};
