import React from 'react';
import { useSelector } from 'react-redux';
import { UIChart, UIChartProps } from '../../ui-components/chart/ui-chart';

type MainChartProps = Pick<UIChartProps, 'height'> & {
    valueId: number;
};

export const MainChart: React.FC<MainChartProps> = ({ valueId, height }) => {

    const { board, id, history } = useSelector(state => state.mainBoard.values[ valueId ]);
    const loading = useSelector(state => state.mainBoard.status[ board ].loading);

    return <UIChart
        loading={loading}
        paneColor={board}
        height={height}
        data={[ {
            id,
            data: (history ?? []).map(({ time, price }) => ({
                x: time,
                y: price
            }))
        } ]}
    />;
};
