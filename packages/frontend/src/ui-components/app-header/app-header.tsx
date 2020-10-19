import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { boardKindList } from '@picsou/shared';
import React from 'react';
import { useSelector } from 'react-redux';
import { UIPaneHeaderTemplate } from '../pane/ui-pane-header-template';
import { UIPaneHeaderValues } from '../pane/ui-pane-header-values';

export const AppHeader: React.FC = () => {
    const loading = useSelector(state => boardKindList.some(board => state.mainBoard.status[ board ].loading));

    return <UIPaneHeaderTemplate
        title='Total'
        rightContent={<UIPaneHeaderValues />}
        loading={loading}
        getMenuContent={closeMenu => {

            // TODO switch +€/+%

            return <MenuItem onClick={() => {
                closeMenu();
                // onSwitch();
            }}>
                <ListItemIcon>
                    <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit values" />
            </MenuItem>;
        }}
    />;
};
