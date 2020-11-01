import { Box, BoxProps, Divider } from '@material-ui/core';
import React from 'react';

export const UIVerticalDivider: React.FC<BoxProps> = props => (
    <Box height='100%' py={0.5} {...props}>
        <Divider orientation='vertical' />
    </Box>
);
