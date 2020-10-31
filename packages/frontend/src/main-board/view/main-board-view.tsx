import { Box, Grid, Theme, useMediaQuery } from '@material-ui/core';
import { boardKindList } from '@picsou/shared';
import React from 'react';
import { AppHeader } from '../../ui-components/app-header/app-header';
import { gainUnitContext } from '../../ui-components/contexts/gain-unit-context';
import { UIPaneHeaderTemplate } from '../../ui-components/pane/ui-pane-header-template';
import { VisitDialog } from '../../visit/visit-dialog';
import { MainPane } from './main-pane';

export const MainBoardView: React.FC = () => {
    const desktopView = useMediaQuery<Theme>(({ breakpoints }) => breakpoints.up('md'));

    return <gainUnitContext.Provider deps={[ desktopView ]}>
        <Box mt={2}>
            <Grid container spacing={2}>

                {desktopView && <Grid item xs={12}>
                    <AppHeader desktopView />
                </Grid>}

                {boardKindList.map(board => <Grid key={board} item xs={12} md={4}>
                    <MainPane board={board} />
                </Grid>)}

                {!desktopView && (
                    <Grid item xs={12} style={{ paddingBottom: 0 }}>
                        <Box visibility='hidden'>
                            <UIPaneHeaderTemplate title='' loading={false} rightContent={null} />
                        </Box>

                        <Box position='fixed' bottom={0} left={0} right={0} zIndex={1}>
                            <AppHeader />
                        </Box>
                    </Grid>
                )}

            </Grid>
        </Box>

        <VisitDialog />

    </gainUnitContext.Provider>;
};
