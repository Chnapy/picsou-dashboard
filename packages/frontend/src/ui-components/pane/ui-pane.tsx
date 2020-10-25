import { Box, ListItemIcon, ListItemText, MenuItem, Paper, Theme, useTheme } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { BoardKind } from '@picsou/shared';
import React from 'react';
import { UIPaneHeaderTemplate, UIPaneHeaderTemplateProps } from './ui-pane-header-template';

export type UIPaneProps = Pick<UIPaneHeaderTemplateProps, 'title' | 'rightContent' | 'loading'> & {
    paneColor: BoardKind;
    onEdit?: () => void;
    alert?: React.ReactNode;
    children: React.ReactNode;
};

export const UIPane: React.FC<UIPaneProps> = props => {

    return <Paper>
        <UIPaneHeader {...props} />
        <Box>
            {props.children}
        </Box>
    </Paper>;
};

const UIPaneHeader: React.FC<UIPaneProps> = ({ title, rightContent, paneColor, loading, onEdit, alert }) => {

    const { palette } = useTheme<Theme>();

    return <UIPaneHeaderTemplate
        title={title}
        extraLeftContent={<Box width={2} height='100%' bgcolor={palette.investment[ paneColor ]} />}
        rightContent={rightContent}
        loading={loading}
        getMenuContent={closeMenu => onEdit && <MenuItem onClick={() => {
            closeMenu();
            onEdit();
        }}>
            <ListItemIcon>
                <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit values" />
        </MenuItem>}
    >
        {alert}
    </UIPaneHeaderTemplate>;
};
