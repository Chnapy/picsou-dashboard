import { BoardKind } from '@picsou/shared';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { InputBoardValueInfos } from '../../ui-components/dialog/edit-values-dialog';
import { UIPane } from '../../ui-components/pane/ui-pane';
import { enumToString } from '../../util/enum-to-string';
import { NormalizeObject } from '../../util/normalize';
import { MainBoardEditLocalAction } from '../reducer/main-board-actions';
import { MainValueLine } from './main-value-line';
import { MainEditValuesDialog } from './main-edit-values-dialog';

export type MainPaneProps = {
    board: BoardKind;
};

export const MainPane = React.memo<MainPaneProps>(({ board }) => {

    const valuesIds = useSelector(state => state.mainBoard.valuesList[ board ]);

    const isEditable = useSelector(state => state.mainBoard.settings[ board ].editable) || undefined;

    const loading = useSelector(state => state.mainBoard.status[ board ].loading);

    const { dispatchSubmit } = useAppDispatch({
        dispatchSubmit: MainBoardEditLocalAction
    });

    const [editOpen, setEditOpen] = React.useState(false);

    const onEditOpen = () => {
        setEditOpen(true);
    };

    const onEditSubmit = async (data: NormalizeObject<InputBoardValueInfos>) => {
        await dispatchSubmit({
            board,
            data
        });
        setEditOpen(false);
    };

    return <>
        <UIPane
            title={enumToString.boardKind(board)}
            paneColor={board}
            loading={loading}
            onEdit={isEditable && onEditOpen}
        >
            {valuesIds.map(id => <MainValueLine key={id} valueId={id} />)}
        </UIPane>

        <MainEditValuesDialog
            board={board}
            open={editOpen}
            onClose={() => setEditOpen(false)}
            onSubmit={onEditSubmit}
        />
    </>;
});
