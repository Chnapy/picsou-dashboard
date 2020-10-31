import { Box, Chip, CircularProgress, Divider, Paper, Theme, useTheme } from '@material-ui/core';
import DateRangeSharpIcon from '@material-ui/icons/DateRangeSharp';
import { PointTooltip, ResponsiveLine, Serie } from '@nivo/line';
import { BoardKind } from '@picsou/shared';
import formatRawFn from 'date-fns/format';
import React from 'react';
import { UIEuroValue } from '../misc/ui-euro-value';
import { UITypography } from '../typography/ui-typography';

export type UIChartProps = {
    loading?: boolean;
    height: number;
    paneColor: BoardKind;
    data: Serie[];
};

const dateFormat = (time: any) => formatRawFn(time, 'dd/MM/yyyy');

export const UIChart: React.FC<UIChartProps> = ({ loading, height, paneColor, data }) => {

    const { palette } = useTheme<Theme>();

    const color = palette.investment[ paneColor ];

    const renderContent = () => {

        if (loading) {
            return (
                <Box height='100%' display='flex' justifyContent='center' alignItems='center' color={color}>
                    <CircularProgress color='inherit' thickness={2} />
                </Box>
            );
        }

        const innerData = data[ 0 ]?.data;

        const firstTime = innerData?.length > 0 && innerData[ 0 ].x as number | undefined;
        const lastTime = innerData?.length > 0 && innerData[ innerData.length - 1 ].x as number | undefined;

        return (
            <>
                <ResponsiveLine
                    data={data}
                    enablePoints={false}
                    enableArea
                    enableGridX={false}
                    enableGridY={false}
                    margin={{ top: 3 }}
                    xScale={{ type: 'linear', min: 'auto' }}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                    xFormat={dateFormat}
                    useMesh
                    colors={color}
                    tooltip={Tooltip}
                />

                <Box position='absolute' left={0} top={0} m={1}>
                    {firstTime && lastTime && <Chip
                        variant='outlined'
                        icon={<DateRangeSharpIcon />}
                        label={<>
                            {dateFormat(lastTime)} - {dateFormat(firstTime)}
                        </>}
                        style={{ borderRadius: 0 }}
                    />}
                </Box>
            </>
        );
    };

    return <Box position='relative' height={height} pt={6}>
        {renderContent()}
    </Box>;
};

const Tooltip: PointTooltip = ({ point }) => {
    const { x, y, data, color } = point;

    return <Paper elevation={4} style={{ transform: `translate(${x},${y})` }}>
        <Box display='flex' flexDirection='column' textAlign='center' borderLeft={'2px solid ' + color} px={2} py={1}>
            <UIEuroValue variant='body2' value={data.y as number} />
            <Box px={2} py={1}>
                <Divider />
            </Box>
            <UITypography variant='body2'>
                {data.xFormatted}
            </UITypography>
        </Box>
    </Paper>;
};
