import { Box, CircularProgress, Grid, IconButton, Menu, Paper } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import { UITypography } from '../typography/ui-typography';

export type UIPaneHeaderTemplateProps = {
    title: string;
    extraLeftContent?: React.ReactNode;
    rightContent: React.ReactNode;
    loading: boolean;
    getMenuContent?: (closeMenu: () => void) => React.ReactNode;
};

export const UIPaneHeaderTemplate: React.FC<UIPaneHeaderTemplateProps> = ({
    title, extraLeftContent, rightContent, loading, getMenuContent
}) => {
    const [ anchorEl, setAnchorEl ] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuContent = getMenuContent && getMenuContent(handleClose);

    return <Paper style={{ position: 'sticky', top: 0, zIndex: 1 }}>
        <Grid container item wrap='nowrap' alignItems='center' spacing={1} style={{
            height: 32,
            marginTop: 0,
            marginBottom: 0
        }}>

            <Grid item style={{
                alignSelf: 'stretch',
                paddingTop: 0,
                paddingBottom: 0
            }}>
                {extraLeftContent}
            </Grid>

            <Grid item>
                <Box mt='1px'>
                    <UITypography variant='labelMini' color='primary'>
                        {title}
                    </UITypography>
                </Box>
            </Grid>

            {loading && <Grid item>
                <CircularProgress style={{ width: '1em', height: '1em' }} />
            </Grid>}

            <Grid container item justify='flex-end' wrap='nowrap' spacing={1} xs>
                {rightContent}
            </Grid>

            <Grid item>
                {menuContent && <IconButton onClick={handleClick} size='small'>
                    <MoreVertIcon />
                </IconButton>}
            </Grid>

        </Grid>

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
            {menuContent}
        </Menu>
    </Paper>;
};

