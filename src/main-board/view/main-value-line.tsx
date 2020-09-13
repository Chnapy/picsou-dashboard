import React from 'react';
import { useSelector } from 'react-redux';
import { ValueLine } from '../../ui-components/value-line/value-line';

export type MainValueLineProps = {
    valueId: string;
};

export const MainValueLine = React.memo<MainValueLineProps>(({ valueId }) => {

    const valueLine = useSelector(state => state.mainBoard.values[ valueId ]);

    return <ValueLine {...valueLine} />;
});
