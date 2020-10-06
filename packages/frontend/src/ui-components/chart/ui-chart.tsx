import { Box, Divider, Paper, Theme, useTheme } from '@material-ui/core';
import { ResponsiveLine, Serie, PointTooltip } from '@nivo/line';
import { BoardKind } from '@picsou/shared';
import React from 'react';
import { UITypography } from '../typography/ui-typography';
import { format } from 'date-fns';

export type UIChartProps = {
    height: number;
    paneColor: BoardKind;
    data: Serie[];
};

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
            xScale={{ type: 'linear', min: 'auto' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
            xFormat={x => format(x as number, 'dd/MM/yyyy')}
            useMesh
            colors={color}
            tooltip={Tooltip}
        />
    </Box>;
};

const Tooltip: PointTooltip = ({ point }) => {
    const { x, y, data, color } = point;

    return <Paper elevation={4} style={{ transform: `translate(${x},${y})` }}>
        <Box display='flex' flexDirection='column' textAlign='center' borderLeft={'2px solid ' + color} px={2} py={1}>
            <UITypography variant='body2'>
                {data.y}
            </UITypography>
            <Box px={2} py={1}>
                <Divider />
            </Box>
            <UITypography variant='body2'>
                {data.xFormatted}
            </UITypography>
        </Box>
    </Paper>;
};
