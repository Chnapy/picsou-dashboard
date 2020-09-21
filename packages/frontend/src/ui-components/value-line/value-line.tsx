import { Box, ButtonBase, Divider, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { BoardValueInfos } from '@picsou/shared';
import { enumToString } from '../../util/enum-to-string';
import { UIEuroValue } from '../misc/ui-euro-value';
import { UIGain } from '../misc/ui-gain';
import { UITypography } from '../typography/ui-typography';

export type ValueLineProps = Omit<BoardValueInfos, 'board'>;

const useStyles = makeStyles(({ palette, spacing }) => ({
    root: {
        display: 'flex',
        width: '100%',
        textAlign: 'left',
        backgroundColor: palette.background.level1,
        padding: spacing(1),
        marginBottom: 2
    }
}));

export const ValueLine: React.FC<ValueLineProps> = ({
    name, oldValueList, currentValue, quantityUnit
}) => {
    const classes = useStyles();

    const quantityTotal = oldValueList.reduce((acc, v) => acc + v.quantity, 0);

    const oldValueFull = oldValueList.reduce((acc, v) => acc + v.oldValue * v.quantity, 0);
    const currentValueFull = currentValue * quantityTotal;

    const oldValueAverage = oldValueFull / quantityTotal;

    return <ButtonBase className={classes.root}>
        <Grid container spacing={1}>

            <Grid item xs={8}>
                <UITypography variant='h4' color='primary'>
                    {name}
                </UITypography>
            </Grid>
            <Grid container item justify='flex-end' xs={4}>
                <UIGain gainVariant='percent' oldValue={oldValueAverage} newValue={currentValue} variant='h4' />
            </Grid>

            <Grid item xs={12}>
                <Divider />
            </Grid>

            <Grid container item xs={4}>
                <UIEuroValue value={oldValueAverage} variant='body1' disabled />
                <Box ml={1}>
                    <UITypography variant='body1'>
                        {enumToString.quantity(quantityTotal, quantityUnit)}
                    </UITypography>
                </Box>
            </Grid>
            <Grid container item justify='center' xs={4}>
                <UIGain gainVariant='euro' oldValue={oldValueAverage} newValue={currentValue} variant='body1' />
            </Grid>
            <Grid container item justify='flex-end' xs={4}>
                <UIEuroValue value={currentValue} variant='body1' color='primary' />
            </Grid>

            <Grid container item xs={4}>
                <UIEuroValue value={oldValueFull} variant='body1' disabled />
            </Grid>
            <Grid container item justify='center' xs={4}>
                <UIGain gainVariant='euro' oldValue={oldValueFull} newValue={currentValueFull} variant='body1' />
            </Grid>
            <Grid container item justify='flex-end' xs={4}>
                <UIEuroValue value={currentValueFull} variant='body1' />
            </Grid>

        </Grid>
    </ButtonBase>;
};