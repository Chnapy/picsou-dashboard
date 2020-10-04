import { Box, Theme, useTheme } from '@material-ui/core';
import { ResponsiveLine, Serie } from '@nivo/line';
import { BoardKind } from '@picsou/shared';
import React from 'react';

export type UIChartProps = {
    height: number;
    paneColor: BoardKind;
    data: Serie[];
};
// TODO fix min value
export const UIChart: React.FC<UIChartProps> = ({ height, paneColor, data }) => {

    const { palette } = useTheme<Theme>();

    const color = palette.investment[ paneColor ];

    return <Box height={height}>
        <ResponsiveLine
            data={data}
            enablePoints={false}
            enableArea
            enableGridX={false}
            enableGridY={false}
            margin={{ top: 3 }}
            xScale={{ type: 'linear', stacked: true }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            colors={color}
        />
    </Box>;
};
