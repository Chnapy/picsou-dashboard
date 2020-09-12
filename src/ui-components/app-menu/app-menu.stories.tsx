import { createStore } from '@reduxjs/toolkit';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { Provider } from 'react-redux';
import { AppState } from '../../main/app-state';
import { AppMenu } from './app-menu';


export default {
    title: 'UI components/App Menu',
    component: AppMenu,
    decorators: [
        Story => {

            const store = createStore((state): Pick<AppState, 'appStep'> => ({ appStep: 'main' }));

            return <Provider store={store}>
                <Story />
            </Provider>;
        }
    ]
} as Meta;

const Template: Story = props => <AppMenu {...props} />;

export const Default = Template.bind({});
Default.args = {};
