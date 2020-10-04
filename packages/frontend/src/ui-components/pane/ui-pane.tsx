import { Box, CircularProgress, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Theme, useTheme } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { BoardKind } from '@picsou/shared';
import React from 'react';
import { UITypography } from '../typography/ui-typography';

export type UIPaneProps = {
    title: string;
    paneColor: BoardKind;
    loading: boolean;
    onEdit?: () => void;
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

const UIPaneHeader: React.FC<UIPaneProps> = ({ title, paneColor, loading, onEdit }) => {

    const { palette } = useTheme<Theme>();

    const [ anchorEl, setAnchorEl ] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return <Box height={32} display='flex' flexWrap='nowrap' alignItems='center'>
        <Box width={2} height='100%' bgcolor={palette.investment[ paneColor ]} />

        <Box display='flex' flexGrow={1} alignItems='center' ml={1}>
            <UITypography variant='labelMini' color='primary'>
                {title}
            </UITypography>
            {loading && <Box ml={0.5}>
                <CircularProgress style={{ width: '1em', height: '1em' }} />
            </Box>}
        </Box>

        <Box pr={0.5}>
            <IconButton onClick={handleClick} size='small'>
                <MoreVertIcon />
            </IconButton>
        </Box>

        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            {onEdit && <MenuItem onClick={() => {
                handleClose();
                onEdit();
            }}>
                <ListItemIcon>
                    <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit values" />
            </MenuItem>}
        </Menu>
    </Box>
};
