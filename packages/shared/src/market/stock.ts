import { ObjStringValues } from '../util/obj-string-values';
import { investingDateUtil } from './util';

export type StockHistoryInterval = 'Daily' | 'Weekly' | 'Monthly';

export type StockHistoryValue = {
    time: number;
    price: number;
    open: number;
    high: number;
    low: number;
    volume: number;
    change: number;
};

export type FetchStockHistoryValuesProps = {
    pairId: number[];
    startDate: Date;
    endDate: Date;
    interval: StockHistoryInterval;
};

export type StockHistoryReqParams = ObjStringValues<FetchStockHistoryValuesProps>;

export type GetStockHistoryReturn = {
    pairId: number;
    history: StockHistoryValue[];
}[];

export const fetchStockPropsToParams = ({ pairId, startDate, endDate, interval }: FetchStockHistoryValuesProps): StockHistoryReqParams => ({
    pairId: pairId.join(','),
    startDate: investingDateUtil.dateToStr(startDate),
    endDate: investingDateUtil.dateToStr(endDate),
    interval,
});
