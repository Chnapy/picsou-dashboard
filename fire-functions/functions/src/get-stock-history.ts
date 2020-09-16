import { AssertionError } from 'assert';
import { JSDOM } from 'jsdom';
import fetch, { Headers } from 'node-fetch';
import { URLSearchParams } from 'url';
import { StockHistoryInterval, StockHistoryReqParams, StockHistoryValue } from '../../../shared/types/get-stock-history';


type InvestingReqBody = {
    curr_id: string;
    action: 'historical_data';
    st_date: string;
    end_date: string;
    interval_sec: StockHistoryInterval;
};

const getOrThrow = <V>(value: V): NonNullable<V> => {
    if (value === undefined || value === null) {
        throw new AssertionError();
    }
    return value!;
};

const commonHeaders = {
    'X-Requested-With': 'XMLHttpRequest'
};

const createBody = (rawBody: object) => {
    const body = new URLSearchParams();

    Object.entries(rawBody).forEach(([key, value]) => body.append(key, value));

    return body;
};

const url = 'https://www.investing.com/instruments/HistoricalDataAjax';

export const getStockHistory = async ({
    pairId, startDate, endDate, interval
}: Partial<StockHistoryReqParams>) => {

    const rawBody: InvestingReqBody = {
        curr_id: getOrThrow(pairId),
        action: 'historical_data',
        st_date: getOrThrow(startDate),
        end_date: getOrThrow(endDate),
        interval_sec: getOrThrow(interval)
    };

    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers(commonHeaders),
        body: createBody(rawBody),
    });

    const html = await res.text();

    const dom = new JSDOM(html);

    const table = getOrThrow(dom.window.document.querySelector('table'));
    const trList = Array.from(table.querySelectorAll('tbody > tr'));

    const history = trList.map((tr): StockHistoryValue => {
        const tdList = tr.querySelectorAll('td');

        const getValue = (i: number) => {
            const item = tdList.item(i)

            return getOrThrow(item.getAttribute('data-real-value') ?? item.textContent);
        };

        return {
            time: +getValue(0),
            price: +getValue(1),
            open: +getValue(2),
            high: +getValue(3),
            low: +getValue(4),
            volume: +getValue(5),
            change: +getValue(6).replace('%', ''),
        };
    });

    return history;
};
