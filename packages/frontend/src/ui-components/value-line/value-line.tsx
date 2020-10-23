import { Button, Divider, Grid, makeStyles } from '@material-ui/core';
import { BoardValueInfos } from '@picsou/shared';
import React from 'react';
import { enumToString } from '../../util/enum-to-string';
import { UIEuroValue } from '../misc/ui-euro-value';
import { UIGain } from '../misc/ui-gain';
import { UITypography } from '../typography/ui-typography';
import { OldValueChip, PaddedValue } from './old-value-chip';

export type ValueLineProps = {
    valueLine: BoardValueInfos;
    onClick: () => void;
};

const useStyles = makeStyles(({ palette, spacing }) => ({
    root: {
        display: 'flex',
        textAlign: 'left',
        backgroundColor: palette.background.level1,
        padding: spacing(1),
        marginBottom: 2
    }
}));

export const ValueLine: React.FC<ValueLineProps> = ({
    valueLine, onClick
}) => {
    const { name, oldValueList, currentValue, board } = valueLine;
    const classes = useStyles();

    const quantityTotal = oldValueList.reduce((acc, v) => acc + v.quantity, 0);

    const oldValueFull = oldValueList.reduce((acc, v) => acc + v.oldValue * v.quantity, 0);
    const currentValueFull = currentValue * quantityTotal;

    const oldValueAverage = oldValueFull / quantityTotal;

    const quantityUnit = enumToString.quantityUnit(board);

    const showDetails = enumToString.shouldShowQuantity(quantityTotal, quantityUnit);

    return <Button className={classes.root} onClick={onClick} fullWidth disableElevation>
        <Grid container spacing={1}>

            <Grid item xs={8}>
                <UITypography variant='h4' color='primary'>
                    {name}
                </UITypography>
            </Grid>
            <Grid container item justify='flex-end' xs={4}>
                <UIGain oldValue={oldValueFull} newValue={currentValueFull} variant='h4' />
            </Grid>

            <Grid item xs={12}>
                <Divider variant='middle' />
            </Grid>

            <Grid item container spacing={1} wrap='nowrap'>
                <Grid container item wrap='nowrap'>
                    <OldValueChip
                        board={board}
                        oldValueList={oldValueList}
                    />
                </Grid>
                <Grid container item justify='center'>
                    <UIGain oldValue={oldValueAverage} newValue={currentValue} variant='body1' />
                </Grid>
                <Grid container item justify='flex-end'>
                    <PaddedValue mr>
                        <UIEuroValue value={currentValue} variant='body1' color='primary' />
                    </PaddedValue>
                </Grid>
            </Grid>

            {showDetails && <>
                <Grid container item xs={6}>
                    <PaddedValue ml>
                        <UIEuroValue value={oldValueFull} variant='body1' disabled />
                    </PaddedValue>
                </Grid>
                <Grid container item justify='flex-end' xs={6}>
                    <PaddedValue mr>
                        <UIEuroValue value={currentValueFull} variant='body1' />
                    </PaddedValue>
                </Grid>
            </>}

        </Grid>
    </Button>;
};
