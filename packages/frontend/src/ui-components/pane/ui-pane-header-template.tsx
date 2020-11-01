import { Box, CircularProgress, Grid, Paper } from '@material-ui/core';
import React from 'react';
import { UIMenuIcon } from '../menu-icon/ui-menu-icon';
import { UITypography } from '../typography/ui-typography';

export type UIPaneHeaderTemplateProps = {
    className?: string;
    title: string;
    extraLeftContent?: React.ReactNode;
    rightContent: React.ReactNode;
    loading: boolean;
    getMenuContent?: (closeMenu: () => void) => React.ReactNode;
};

export const UIPaneHeaderTemplate: React.FC<UIPaneHeaderTemplateProps> = ({
    className, title, extraLeftContent, rightContent, loading, getMenuContent, children
}) => {

    return <Paper className={className} style={{ position: 'sticky', top: 0, zIndex: 1 }}>
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
                {getMenuContent && <Box ml={-1}>
                    <UIMenuIcon>
                        {getMenuContent}
                    </UIMenuIcon>
                </Box>}
            </Grid>

        </Grid>

        {children}
    </Paper>;
};

