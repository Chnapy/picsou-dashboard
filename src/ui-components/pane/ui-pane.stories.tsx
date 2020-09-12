import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { UIPane, UIPaneProps } from './ui-pane';

export default {
    title: 'UI components/Pane',
    component: UIPane
} as Meta;

const Template: Story<UIPaneProps> = props => <UIPane {...props}/>;

export const Default = Template.bind({});
Default.args = {
    title: 'Market',
    paneColor: 'market'
};
