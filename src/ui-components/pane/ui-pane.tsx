import { Box, IconButton, Paper, Theme, useTheme } from '@material-ui/core';
import { PaletteInvestment } from '@material-ui/core/styles/createPalette';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import { UITypography } from '../typography/ui-typography';

export type UIPaneProps = {
    title: string;
    paneColor: keyof PaletteInvestment;
};

export const UIPane: React.FC<UIPaneProps> = props => {

    return <Paper>
        <UIPaneHeader {...props} />
    </Paper>;
};

const UIPaneHeader: React.FC<UIPaneProps> = ({ title, paneColor }) => {

    const { palette } = useTheme<Theme>();

    return <Box height={32} display='flex' flexWrap='nowrap' alignItems='center'>
        <Box width={2} height='100%' bgcolor={palette.investment[ paneColor ]} />

        <Box flexGrow={1} ml={1}>
            <UITypography variant='labelMini' color='primary'>
                {title}
            </UITypography>
        </Box>

        <Box pr={0.5}>
            <IconButton size='small'>
                <MoreVertIcon />
            </IconButton>
        </Box>

    </Box>
};
