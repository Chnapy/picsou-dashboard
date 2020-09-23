import { BoardKind } from '@picsou/shared';
import React from 'react';
import { useSelector } from 'react-redux';
import { createMarketFetcher } from '../../data-fetcher/market/market-fetcher';
import { EditSearchData, EditValuesDialog, EditValuesDialogProps } from '../../ui-components/dialog/edit-values-dialog';

export type MainEditValuesDialogProps = Omit<EditValuesDialogProps, 'boardInfos' | 'fetchNameSearch'>;

let fetcher: ReturnType<typeof createMarketFetcher> | null = null;

const fetcherPerBoard: Record<BoardKind, EditValuesDialogProps[ 'fetchNameSearch' ]> = {
    cash: undefined,

    market: async (search) => {
        if (!fetcher) {
            fetcher = createMarketFetcher();
        }
    
        const { data } = await fetcher.fetchStockSearch(search);
    
        return data.map(({ pairId, name, pair_type, flag, symbol }): EditSearchData => ({
            id: pairId,
            name,
            secondary: symbol + ' - ' + pair_type.toUpperCase(),
            extra: flag.substr(0, 3).toUpperCase(),
        }));
    },

    gold: undefined,
};

export const MainEditValuesDialog: React.FC<MainEditValuesDialogProps> = props => {

    const listIds = useSelector(state => state.mainBoard.valuesList[ props.board ]);
    const values = useSelector(state => state.mainBoard.values);

    const boardInfos = listIds.map(id => values[ id ]);

    return <EditValuesDialog
        boardInfos={boardInfos}
        fetchNameSearch={fetcherPerBoard[props.board]}
        {...props}
    />;
};
