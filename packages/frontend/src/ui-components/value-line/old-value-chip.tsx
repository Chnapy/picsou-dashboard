import { Box, Chip, Divider, Grid, makeStyles } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { BoardKind, BoardValueInfos } from '@picsou/shared';
import clsx from 'clsx';
import React from 'react';
import { enumToString } from '../../util/enum-to-string';
import { UIEuroValue } from '../misc/ui-euro-value';
import { UITypography } from '../typography/ui-typography';

type OldValueChipProps = {
    board: BoardKind;
    oldValueList: BoardValueInfos[ 'oldValueList' ];
};

type StyleProps = {
    open: boolean;
    singleOldValue: boolean;
};

const useStyles = makeStyles(({ palette, spacing }) => ({
    root: () => ({
        height: 'auto',
        cursor: 'inherit',
        backgroundColor: 'transparent'
    }),
    rootOpen: {
        '&, &:hover': {
            backgroundColor: palette.background.paper + ' !important',
        },
        borderRadius: 0,
        paddingTop: spacing(1),
        paddingBottom: spacing(1),
    },
    label: {
        display: 'inline-flex',
        flexDirection: 'column'
    },
    deleteIcon: ({ singleOldValue }: StyleProps) => ({
        display: singleOldValue ? 'none' : undefined,
        alignSelf: 'flex-start'
    })
}));

export const OldValueChip: React.FC<OldValueChipProps> = ({ board, oldValueList }) => {
    const [ open, setOpen ] = React.useState(false);

    const containerRef = React.useRef<HTMLDivElement>();

    const singleOldValue = oldValueList.length === 1;

    const { rootOpen: rootOpenClass, ...classes } = useStyles({ open, singleOldValue });

    const quantityTotal = oldValueList.reduce((acc, v) => acc + v.quantity, 0);

    const oldValueFull = oldValueList.reduce((acc, v) => acc + v.oldValue * v.quantity, 0);
    const oldValueAverage = oldValueFull / quantityTotal;

    const quantityUnit = enumToString.quantityUnit(board);
    const showDetails = enumToString.shouldShowQuantity(quantityTotal, quantityUnit);

    const onClick = singleOldValue ? undefined : () => setOpen(!open);

    const isHTMLElement = (e: any): e is HTMLElement => 'classList' in e;

    const isTargetingChip = (e: Event) => e.composedPath && e.composedPath().some(el => isHTMLElement(el) && el.classList.contains('MuiChip-clickable'));

    const stopPropagationFn = (e: Event) => {
        if (singleOldValue) {
            return;
        }

        if (isTargetingChip(e)) {
            e.preventDefault();
            e.stopPropagation();

            return false;
        }
    };

    const stopPropagationReactFn = (e: React.SyntheticEvent) => {
        if (singleOldValue) {
            return;
        }

        const { nativeEvent } = e;
        if (isTargetingChip(nativeEvent)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    };

    // stop propagation for mobile
    React.useEffect(() => {
        const containerEl = containerRef.current;
        if (containerEl && !singleOldValue && onClick) {
            containerEl.addEventListener('touchstart', stopPropagationFn, { passive: false });
            containerEl.addEventListener('touchend', onClick, { passive: false });

            return () => {
                containerEl.removeEventListener('touchstart', stopPropagationFn);
                containerEl.removeEventListener('touchend', onClick);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ containerRef.current, singleOldValue ]);

    const rootLabel = (
        <Box display='flex' flexWrap='nowrap'>
            <UIEuroValue value={oldValueAverage} variant='body1' disabled />
            {showDetails && <Box ml={1}>
                <UITypography variant='body1'>
                    {enumToString.quantity(quantityTotal, quantityUnit)}
                </UITypography>
            </Box>}
        </Box>
    );

    const label = open
        ? <>
            {rootLabel}
            <Box my={1}>
                <Divider variant='middle' />
            </Box>
            {oldValueList.map(({ oldValue, quantity }, i) => (
                <Grid key={i} container justify='space-between' wrap='nowrap' spacing={1}>
                    <Grid item>
                        <UIEuroValue value={oldValue} variant='body1' disabled />
                    </Grid>
                    <Grid item>
                        <UITypography variant='body1'>
                            {enumToString.quantity(quantity, quantityUnit)}
                        </UITypography>
                    </Grid>
                </Grid>
            ))}
        </>
        : rootLabel;

    return (
        <Box>
            <Box
                /* @ts-expect-error need to fix #17010 (TODO upgrade to MUI v5) */
                ref={containerRef}
                display='inline-flex'
                onMouseDown={stopPropagationReactFn}
                onClick={stopPropagationReactFn}
            >
                <Chip
                    classes={classes}
                    className={clsx({ [ rootOpenClass ]: open })}
                    variant='outlined'
                    label={label}
                    clickable={!singleOldValue}
                    deleteIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    onClick={onClick}
                    onDelete={onClick}
                />
            </Box>
        </Box>
    );
};

export const PaddedValue: React.FC<{
    ml?: true;
    mr?: true;
}> = ({ ml, mr, children }) => (
    <Box ml={ml && '13px'} mr={mr && '13px'}>
        {children}
    </Box>
);
