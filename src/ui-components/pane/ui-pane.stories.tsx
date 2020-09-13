import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { ValueLine } from '../value-line/value-line';
import { Default as ValueLineDefault } from '../value-line/value-line.stories';
import { UIPane, UIPaneProps } from './ui-pane';


export default {
    title: 'UI components/Pane',
    component: UIPane
} as Meta;

const Template: Story<UIPaneProps> = props => <UIPane {...props} />;

const ValueLineStory: React.FC = () => <ValueLine {...ValueLineDefault.args as any} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Market',
    paneColor: 'market'
};

export const WithValues = Template.bind({});
WithValues.args = {
    title: 'Market',
    paneColor: 'market',
    children: <>
        <ValueLineStory />
        <ValueLineStory />
        <ValueLineStory />
    </>,
};
