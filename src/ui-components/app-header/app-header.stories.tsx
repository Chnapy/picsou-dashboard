import { Story } from '@storybook/react/types-6-0';
import React from 'react';
import { AppHeader, AppHeaderProps } from './app-header';

export default {
    title: 'UI components/App header'
};

export const Default: Story<AppHeaderProps> = props => <AppHeader {...props}/>;
Default.args = {
    username: 'chnapy'
};
