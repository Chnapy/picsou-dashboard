import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { EditValuesDialog, EditValuesDialogProps } from './edit-values-dialog';


export default {
    title: 'UI components/Edit values dialog',
    component: EditValuesDialog
} as Meta;

const Template: Story<EditValuesDialogProps> = props => <EditValuesDialog {...props} />;

export const Market = Template.bind({});
Market.args = {
    open: true,
    board: 'market',
    boardInfos: [
        {
            id: 1234,
            board: 'market',
            name: 'Euro stoxx 300',
            quantityUnit: 'unit',
            oldValueList: [
                {
                    oldValue: 171.32,
                    quantity: 8
                },
                {
                    oldValue: 170.32,
                    quantity: 4
                },
            ]
        },
        {
            id: 3287,
            board: 'market',
            name: 'Apple',
            quantityUnit: 'unit',
            oldValueList: [
                {
                    oldValue: 114.32,
                    quantity: 2
                },
                {
                    oldValue: 123.32,
                    quantity: 12
                },
            ]
        },
    ]
};

export const MarketEmpty = Template.bind({});
MarketEmpty.args = {
    open: true,
    board: 'market',
    boardInfos: [],
    fetchNameSearch: search => new Promise(r => {

        setTimeout(() => r([
            {
                id: 123,
                name: 'Française des jeux',
                extra: 'FR',
                secondary: 'FDJ'
            },
            {
                id: 675,
                name: 'Apple',
                extra: 'USA',
                secondary: 'AAPL'
            }
        ]), 20000);
    })
};
