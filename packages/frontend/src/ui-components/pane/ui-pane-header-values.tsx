import { Box, Grid } from '@material-ui/core';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import { BoardValueInfos } from '@picsou/shared';
import React from 'react';
import { useSelector } from 'react-redux';
import { denormalize } from '../../util/normalize';
import { UIEuroValue } from '../misc/ui-euro-value';
import { UIGain } from '../misc/ui-gain';
import { UIVerticalDivider } from '../misc/ui-vertical-divider';
import { useComputedValueTotal } from '../value-line/hooks/use-computed-value';

type UIPaneHeaderValuesProps = {
    filterFn?: (value: BoardValueInfos) => boolean;
};

export const UIPaneHeaderValues: React.FC<UIPaneHeaderValuesProps> = ({
    filterFn = () => true
}) => {

    const values = denormalize(useSelector(state => state.mainBoard.values))
        .filter(filterFn);

    const computedValueTotal = useComputedValueTotal(values);

    return React.useMemo(
        () => (
            <>
                <Grid item>
                    <UIEuroValue variant='body2' value={computedValueTotal.oldValueTotal} />
                </Grid>
                <Grid item>
                    <Box mx={-1}>
                        <ChevronRightSharpIcon fontSize='small' style={{ float: 'left', opacity: 0.5 }} />
                    </Box>
                </Grid>
                <Grid item>
                    <UIEuroValue variant='body2' color='primary' value={computedValueTotal.currentValueTotal} />
                </Grid>
                <Grid item>
                    <UIVerticalDivider />
                </Grid>
                <Grid item>
                    <UIGain unit='auto' variant='body2' {...computedValueTotal.getTotalGainProps()} />
                </Grid>
                <Grid item>
                    <UIVerticalDivider />
                </Grid>
                <Grid item>
                    <UIGain unit='auto' variant='body2' {...computedValueTotal.getFromYesterdayTotalGainProps()} />
                </Grid>
            </>
        ),
        [ computedValueTotal ]
    );
};
