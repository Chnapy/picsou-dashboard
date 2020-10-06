import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { boardKindList } from '@picsou/shared';
import { MainPane } from './main-pane';

export const MainBoardView: React.FC = () => {

    return <Grid container spacing={2}>

        {boardKindList.map(board => <Grid key={board} item xs={12} md={4}>
            <Box mb={2}>
                <MainPane board={board} />
            </Box>
        </Grid>)}

    </Grid>;
};
