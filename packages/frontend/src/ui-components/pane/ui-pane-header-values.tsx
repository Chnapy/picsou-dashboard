import { Grid } from '@material-ui/core';
import { BoardValueInfos } from '@picsou/shared';
import React from 'react';
import { useSelector } from 'react-redux';
import { denormalize } from '../../util/normalize';
import { UIEuroValue } from '../misc/ui-euro-value';
import { UIGain } from '../misc/ui-gain';

type UIPaneHeaderValuesProps = {
    filterFn?: (value: BoardValueInfos) => boolean;
};

export const UIPaneHeaderValues: React.FC<UIPaneHeaderValuesProps> = ({
    filterFn = () => true
}) => {

    const values = denormalize(useSelector(state => state.mainBoard.values))
        .filter(filterFn);

    const { oldValue, currentValue } = values
        .map(({ oldValueList, currentValue }) => {

            const quantityTotal = oldValueList.reduce((acc, v) => acc + v.quantity, 0);
            const oldValueFull = oldValueList.reduce((acc, v) => acc + v.oldValue * v.quantity, 0);
            const currentValueFull = currentValue * quantityTotal;

            return {
                oldValueFull,
                currentValueFull
            };
        })
        .reduce((acc, { oldValueFull, currentValueFull }) => {
            acc.oldValue += oldValueFull;
            acc.currentValue += currentValueFull;

            return acc;
        }, {
            oldValue: 0,
            currentValue: 0
        });

    return React.useMemo(
        () => (
            <>
                <Grid item>
                    <UIEuroValue variant='body2' value={oldValue} />
                </Grid>
                <Grid item>
                    <UIGain unit='auto' variant='body2' oldValue={oldValue} newValue={currentValue} />
                </Grid>
                <Grid item>
                    <UIEuroValue variant='body2' color='primary' value={currentValue} />
                </Grid>
            </>
        ),
        [ oldValue, currentValue ]
    );
};
