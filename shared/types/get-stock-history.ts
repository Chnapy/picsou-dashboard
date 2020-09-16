
export type StockHistoryInterval = 'Daily' | 'Weekly' | 'Monthly';

export type StockHistoryReqParams = {
    pairId: string;
    startDate: string;
    endDate: string;
    interval: StockHistoryInterval;
};

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
    pairId: number;
    startDate: Date;
    endDate: Date;
    interval: StockHistoryInterval;
};
