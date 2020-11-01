import { Box, Button, Divider, Grid, makeStyles } from '@material-ui/core';
import { BoardValueInfos } from '@picsou/shared';
import React from 'react';
import { enumToString } from '../../util/enum-to-string';
import { UIEuroValue, UIEuroValueProps } from '../misc/ui-euro-value';
import { UIGain, UIGainNumericData } from '../misc/ui-gain';
import { UIVerticalDivider } from '../misc/ui-vertical-divider';
import { UITypography } from '../typography/ui-typography';
import { useComputedValue } from './hooks/use-computed-value';
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
    const { name, oldValueList, board } = valueLine;
    const classes = useStyles();

    const computedValue = useComputedValue(valueLine);

    const quantityUnit = enumToString.quantityUnit(board);

    const showDetails = enumToString.shouldShowQuantity(computedValue.quantityTotal, quantityUnit);

    const renderValue = ({ color, oldValue, newValue }: Pick<UIEuroValueProps, 'color'> & UIGainNumericData) => (
        <PaddedValue mr>
            <Grid container direction='column' alignItems='flex-end'>
                <Grid item>
                    <UIEuroValue value={newValue} variant='body1' color={color} />
                </Grid>
                <Grid item style={{ marginTop: -4 }}>
                    <UIGain unit='euro' variant='labelMini' oldValue={oldValue} newValue={newValue} style={{ fontWeight: 400 }} />
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
                    <UIGain unit='percent' variant='h4' {...computedValue.getFullGainProps()} />
                </Grid>
                <Grid item>
                    <UIVerticalDivider mx={1} />
                </Grid>
                <Grid item>
                    <UIGain unit='percent' variant='h4' {...computedValue.getFromYesterdayGainProps()} />
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
                        ...computedValue.getValueGainProps(),
                    })}
                </Grid>
            </Grid>

            {showDetails && <Grid container item wrap='nowrap' alignItems='center' spacing={1}>
                <Grid item>
                    <PaddedValue ml>
                        <UIEuroValue value={computedValue.oldValueFull} variant='body1' disabled />
                    </PaddedValue>
                </Grid>

                <Grid container item justify='flex-end'>
                    {renderValue(computedValue.getFullGainProps())}
                </Grid>
            </Grid>}

        </Grid>
    </Button>;
};
