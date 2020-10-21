import { Box, Grid, ListItemIcon, ListItemText, MenuItem, Switch } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { boardKindList } from '@picsou/shared';
import React from 'react';
import { useSelector } from 'react-redux';
import { getFirebase } from '../../firebase/create-firebase-app';
import { gainUnitContext } from '../contexts/gain-unit-context';
import { UIPaneHeaderTemplate } from '../pane/ui-pane-header-template';
import { UIPaneHeaderValues } from '../pane/ui-pane-header-values';

const Symbol: React.FC = ({ children }) => <Box fontSize='1.4em' fontWeight={600}>{children}</Box>;

export const AppHeader: React.FC = () => {
    const loading = useSelector(state => boardKindList.some(board => state.mainBoard.status[ board ].loading));

    const gainUnit = gainUnitContext.useValue();
    const setGainUnit = gainUnitContext.useDispatch();

    return <UIPaneHeaderTemplate
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
                                <Symbol>€</Symbol>
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
                                <Symbol>%</Symbol>
                            </Grid>
                        </Grid>
                    } />
                </MenuItem>

                <MenuItem onClick={() => getFirebase().auth().signOut()}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary='Log out' />
                </MenuItem>
            </>;
        }}
    />;
};
