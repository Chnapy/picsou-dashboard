import { Grid } from '@material-ui/core';
import { boardKindList } from '@picsou/shared';
import React from 'react';
import { AppHeader } from '../../ui-components/app-header/app-header';
import { MainPane } from './main-pane';

export const MainBoardView: React.FC = () => {

    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <AppHeader />
        </Grid>

        {boardKindList.map(board => <Grid key={board} item xs={12} md={4}>
            <MainPane board={board} />
        </Grid>)}

    </Grid>;
};
