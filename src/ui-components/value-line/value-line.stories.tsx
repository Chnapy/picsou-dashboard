import { Box } from '@material-ui/core';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { ValueLine, ValueLineProps } from './value-line';

export default {
    title: 'UI components/Value Line',
    component: ValueLine
} as Meta;

const Template: Story<ValueLineProps> = props => <Box width={400}>
    <ValueLine {...props} />
</Box>;

export const Default = Template.bind({});
Default.args = {
    name: 'Euro stoxx 300',
    oldValue: 171.86,
    currentValue: 174.23,
    quantity: 8,
    // oldValueDate: null as any
};
