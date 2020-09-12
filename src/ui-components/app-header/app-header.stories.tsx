import { UIThemeProvider } from '../../main/view/ui-theme-provider';
import React from 'react';
import { Box } from '@material-ui/core';
import { AppHeader, AppHeaderProps } from './app-header';
import { Story } from '@storybook/react/types-6-0';

export default {
    title: 'UI components/App header'
};

export const Default: Story<AppHeaderProps> = props => {

    return <UIThemeProvider>
        <Box p={2}>

            <AppHeader {...props}/>

        </Box>
    </UIThemeProvider>;
};
Default.args = {
    username: 'chnapy'
};
