import { Box, Button, Divider, Grid, makeStyles } from '@material-ui/core';
import { BoardValueInfos } from '@picsou/shared';
import React from 'react';
import { enumToString } from '../../util/enum-to-string';
import { UIEuroValue, UIEuroValueProps } from '../misc/ui-euro-value';
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
        textTransform: 'initial',
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

    const renderValue = ({ color, oldValue, currentValue }: Pick<UIEuroValueProps, 'color'> & { oldValue: number; currentValue: number; }) => (
        <PaddedValue mr>
            <Grid container direction='column' alignItems='flex-end'>
                <Grid item>
                    <UIEuroValue value={currentValue} variant='body1' color={color} />
                </Grid>
                <Grid item style={{ marginTop: -4 }}>
                    <UIGain unit='euro' variant='labelMini' oldValue={oldValue} newValue={currentValue} style={{ fontWeight: 400 }} />
                </Grid>
            </Grid>
        </PaddedValue>
    );

    return <Button className={classes.root} onClick={onClick} fullWidth disableElevation>
        <Grid container>

            <Grid item container wrap='nowrap' xs={12}>
                <Grid item xs>
                    <UITypography variant='h4' color='primary'>
                        {name}
                    </UITypography>
                </Grid>
                <Grid item>
                    <UIGain unit='percent' oldValue={oldValueFull} newValue={currentValueFull} variant='h4' />
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Box my={0.5}>
                    <Divider />
                </Box>
            </Grid>

            <Grid item container spacing={1} wrap='nowrap'>
                <Grid item xs>
                    <Box mt={0.5}>
                        <OldValueChip
                            board={board}
                            oldValueList={oldValueList}
                        />
                    </Box>
                </Grid>

                <Grid item>
                    {renderValue({
                        color: 'primary',
                        oldValue: oldValueAverage,
                        currentValue
                    })}
                </Grid>
            </Grid>

            {showDetails && <Grid container item wrap='nowrap' alignItems='center' spacing={1}>
                <Grid item>
                    <PaddedValue ml>
                        <UIEuroValue value={oldValueFull} variant='body1' disabled />
                    </PaddedValue>
                </Grid>

                <Grid container item justify='flex-end'>
                    {renderValue({
                        oldValue: oldValueFull,
                        currentValue: currentValueFull
                    })}
                </Grid>
            </Grid>}

        </Grid>
    </Button>;
};
