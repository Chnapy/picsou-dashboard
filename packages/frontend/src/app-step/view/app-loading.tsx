import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';
import { UITypography } from '../../ui-components/typography/ui-typography';

export const AppTitle: React.FC<{ withFilter?: boolean }> = ({ withFilter }) => (
    <UITypography variant='h1' align='center' gutterBottom
        style={withFilter
            ? { filter: 'drop-shadow(rgba(0, 0, 0, 0.25) -3px 3px 0px)' }
            : undefined}
    >
        Picsou dashboard
    </UITypography>
);

export const AppLoading: React.FC = () => (
    <Box display='flex' flexDirection='column' height='100%' justifyContent='center' alignItems='center'>
        <AppTitle />

        <CircularProgress thickness={2} />
    </Box>
);
