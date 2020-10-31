import { Box, Grid, ListItemIcon, ListItemText, makeStyles, MenuItem, Switch } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToAppSharp';
import TrendingUpIcon from '@material-ui/icons/TrendingUpSharp';
import { boardKindList } from '@picsou/shared';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { GainUnit, gainUnitContext } from '../contexts/gain-unit-context';
import { UIPaneHeaderTemplate } from '../pane/ui-pane-header-template';
import { UIPaneHeaderValues } from '../pane/ui-pane-header-values';
import { GithubRepoMenuItem } from './github-repo-button';
import { logOutAct } from './log-out-act';

type AppHeaderProps = {
    desktopView?: boolean;
};

const useStyles = makeStyles(() => ({
    root: ({ desktopView }: AppHeaderProps) => desktopView
        ? {}
        : {
            boxShadow: '0px -2px 1px -1px rgba(0,0,0,0.2), 0px -1px 1px 0px rgba(0,0,0,0.14), 0px -1px 3px 0px rgba(0,0,0,0.12)'
        }
}));

const getUnitSymbol = (unit: GainUnit) => <Box display='inline' fontSize='1.4rem'>{unit === 'euro' ? '€' : '%'}</Box>;

export const AppHeader: React.FC<AppHeaderProps> = props => {
    const classes = useStyles(props);
    const loading = useSelector(state => boardKindList.some(board => state.mainBoard.status[ board ].loading));

    const { dispatchLogOut } = useAppDispatch({
        dispatchLogOut: logOutAct
    });

    const gainUnit = gainUnitContext.useValue();
    const setGainUnit = gainUnitContext.useDispatch();

    return <UIPaneHeaderTemplate
        className={classes.root}
        title='Picsou'
        rightContent={<UIPaneHeaderValues />}
        loading={loading}
        getMenuContent={closeMenu => {

            return <>
                <MenuItem onClick={() => {
                    setGainUnit(gainUnit === 'euro' ? 'percent' : 'euro');
                }}>
                    <ListItemIcon>
                        <TrendingUpIcon />
                    </ListItemIcon>
                    <ListItemText primary={
                        <Grid container wrap='nowrap' alignItems='center' spacing={1}>
                            <Grid item xs>
                                <Box pr={3}>
                                    Gain unit
                            </Box>
                            </Grid>
                            <Grid item>
                                {getUnitSymbol('euro')}
                            </Grid>
                            <Grid item>
                                <Box mx={-1.5}>
                                    <Switch
                                        edge={false}
                                        checked={gainUnit === 'percent'}
                                    />
                                </Box>
                            </Grid>
                            <Grid item>
                                {getUnitSymbol('percent')}
                            </Grid>
                        </Grid>
                    } />
                </MenuItem>

                <MenuItem onClick={() => dispatchLogOut()}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary='Log out' />
                </MenuItem>

                <GithubRepoMenuItem />
            </>;
        }}
    />;
};
