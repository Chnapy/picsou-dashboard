import { Alert } from '@material-ui/lab';
import { BoardKind } from '@picsou/shared';
import isToday from 'date-fns/isToday';
import React from 'react';
import { useSelector } from 'react-redux';

export const useBoardAlert = (board: BoardKind) => {
    const isVisitor = useSelector(state => state.auth.isVisitor);
    const loading = useSelector(state => state.mainBoard.status[ board ].loading);
    const lastFetchTime = useSelector(state => state.mainBoard.status[ board ].lastFetchTime);

    if (isVisitor || loading || isToday(lastFetchTime!)) {
        return null;
    }

    return (
        <Alert severity='warning'>
            Data not fetched today.
        </Alert>
    );
};
