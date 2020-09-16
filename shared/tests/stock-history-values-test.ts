import { format, parse } from 'date-fns';
import { FetchStockHistoryValuesProps, StockHistoryReqParams, StockHistoryValue } from '../types/get-stock-history';

const investingFormat = 'MM/dd/yyyy';

export const dateToInvestingStr = (date: Date) => format(date, investingFormat);
const dateStrToDate = (dateISO: string) => parse(dateISO, investingFormat, new Date());

const paramsQuery: StockHistoryReqParams = {
    pairId: '997026',
    startDate: '08/20/2020',
    endDate: '08/23/2020',
    interval: 'Daily',
};

const paramsRaw: FetchStockHistoryValuesProps = {
    pairId: 997026,
    startDate: dateStrToDate(paramsQuery.startDate),
    endDate: dateStrToDate(paramsQuery.endDate),
    interval: 'Daily'
};

const expectedData: StockHistoryValue[] = [
    { "change": -0.24, "high": 172.5, "low": 169.82, "open": 172.5, "price": 171.32, "time": 1597968000, "volume": 752 },
    { "change": -1.2, "high": 172.06, "low": 171.34, "open": 171.68, "price": 171.74, "time": 1597881600, "volume": 92 }
];

export const getStockHistoryValuesTestData = () => ({
    paramsQuery,
    paramsRaw,
    expectedData,
});
