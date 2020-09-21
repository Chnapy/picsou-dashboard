import { FetchStockHistoryValuesProps, fetchStockPropsToParams, GetStockHistoryReturn } from '../stock';
import { investingDateUtil } from '../util';

const paramsRaw: FetchStockHistoryValuesProps = {
    pairId: [ 997026 ],
    startDate: investingDateUtil.strToDate('08/20/2020'),
    endDate: investingDateUtil.strToDate('08/23/2020'),
    interval: 'Daily'
};

const expectedData: GetStockHistoryReturn = [ {
    pairId: 997026,
    history: [
        { "change": -0.24, "high": 172.5, "low": 169.82, "open": 172.5, "price": 171.32, "time": 1597968000, "volume": 752 },
        { "change": -1.2, "high": 172.06, "low": 171.34, "open": 171.68, "price": 171.74, "time": 1597881600, "volume": 92 }
    ]
} ];

export const getStockHistoryValuesTestData = () => ({
    paramsRaw,
    paramsQuery: fetchStockPropsToParams(paramsRaw),
    expectedData,
});
