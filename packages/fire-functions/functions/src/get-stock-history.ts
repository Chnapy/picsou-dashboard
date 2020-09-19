import { StockHistoryInterval, StockHistoryReqParams, StockHistoryValue } from '@picsou/shared';
import { AssertionError } from 'assert';
import { JSDOM } from 'jsdom';
import fetch, { Headers } from 'node-fetch';
import { URLSearchParams } from 'url';


type InvestingReqBody = {
    curr_id: string;
    action: 'historical_data';
    st_date: string;
    end_date: string;
    interval_sec: StockHistoryInterval;
};

export type GetStockHistoryReturn = {
    history: StockHistoryValue[];
};

const getOrThrow = <V>(value: V, message?: string): NonNullable<V> => {
    if (value === undefined || value === null) {
        throw new AssertionError({ message });
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
}: Partial<StockHistoryReqParams>): Promise<GetStockHistoryReturn> => {

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

    if (trList[0].querySelector('td')?.textContent === 'No results found') {
        throw new Error('No results found');
    }

    const history = trList.map((tr): StockHistoryValue => {
        const tdList = tr.querySelectorAll('td');

        const getValue = (i: number) => {
            const item = getOrThrow(tdList.item(i), `td n°${i} is null`);

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

    return { history };
};
