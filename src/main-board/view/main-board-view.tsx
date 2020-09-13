import React from 'react';
import { Box } from '@material-ui/core';
import { boardKindList } from '../reducer/main-board-reducer';
import { MainPane } from './main-pane';

export const MainBoardView: React.FC = () => {

    return <Box display='flex' flexDirection='column'>

        {boardKindList.map(board => <Box key={board} mb={2}>
            <MainPane board={board} />
        </Box>)}

    </Box>;
};
