import { Box, Card } from '@material-ui/core';
import React from 'react';
import { UIButton } from './ui-button';

export default {
    title: 'UI components/Button'
};

export const Default = () => {

    return <Card>

        <Box display='inline-block' m={2}>
            <UIButton>
                default
</UIButton>
        </Box>

        <Box display='inline-block' m={2}>
            <UIButton variant='secondary'>
                secondary
</UIButton>
        </Box>

        <Box display='inline-block' m={2}>
            <UIButton variant='primary'>
                primary
</UIButton>
        </Box>

        <br />

        <Box display='inline-block' m={2}>
            <UIButton variant='secondary' disabled>
                secondary
</UIButton>
        </Box>

        <Box display='inline-block' m={2}>
            <UIButton variant='primary' disabled>
                primary
</UIButton>
        </Box>

    </Card>;
};
