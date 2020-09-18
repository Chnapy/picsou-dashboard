import React from 'react';
import { useSelector } from 'react-redux';
import { BoardKind } from '../../../shared/types/board-types';
import { UIPane } from '../../ui-components/pane/ui-pane';
import { enumToString } from '../../util/enum-to-string';
import { MainValueLine } from './main-value-line';

export type MainPaneProps = {
    board: BoardKind;
};

export const MainPane = React.memo<MainPaneProps>(({ board }) => {

    const valuesIds = useSelector(state => state.mainBoard.valuesList[ board ]);

    return <UIPane
        title={enumToString.boardKind(board)}
        paneColor={board}
    >
        {valuesIds.map(id => <MainValueLine valueId={id} />)}
    </UIPane>
});
