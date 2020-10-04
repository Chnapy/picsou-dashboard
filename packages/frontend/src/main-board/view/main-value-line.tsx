import React from 'react';
import { useSelector } from 'react-redux';
import { BoardValueInfos } from '@picsou/shared';
import { ValueLine, ValueLineProps } from '../../ui-components/value-line/value-line';

export type MainValueLineProps = Pick<ValueLineProps, 'onClick'> & {
    valueId: BoardValueInfos[ 'id' ];
};

export const MainValueLine = React.memo<MainValueLineProps>(({ valueId, onClick }) => {

    const valueLine = useSelector(state => state.mainBoard.values[ valueId ]);

    const valueTotal = valueLine.oldValueList.reduce((acc, { oldValue, quantity }) => acc + oldValue * quantity, 0);

    if (!valueTotal) {
        return null;
    }

    return <ValueLine valueLine={valueLine} onClick={onClick} />;
});
