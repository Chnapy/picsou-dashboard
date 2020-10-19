import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { UIPane } from '../pane/ui-pane';
import { UIChart, UIChartProps } from './ui-chart';


export default {
    title: 'UI components/Chart',
    component: UIChart
} as Meta;

const Template: Story<UIChartProps> = props => <UIPane title='chart' rightContent={null} paneColor='market' loading={false}>
    <UIChart {...props} />
</UIPane>

export const Chart = Template.bind({});
Chart.args = {
    height: 200,
    data: [
        {
            id: 'Toto',
            data: [
                {
                    x: 0,
                    y: Math.random() * 100
                },
                {
                    x: 20,
                    y: Math.random() * 100
                },
                {
                    x: 40,
                    y: Math.random() * 100
                },
                {
                    x: 60,
                    y: Math.random() * 100
                },
                {
                    x: 80,
                    y: Math.random() * 100
                },
            ]
        }
    ],
    paneColor: 'market'
};
