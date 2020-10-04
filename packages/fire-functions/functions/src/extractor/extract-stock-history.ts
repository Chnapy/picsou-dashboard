import { HistoryData, HistoryValue, StockHistoryInterval, StockHistoryReqParams } from '@picsou/shared';
import * as functions from 'firebase-functions';
import { JSDOM } from 'jsdom';
import fetch, { Headers } from 'node-fetch';
import { extractorUtils } from './extractor-utils';


type InvestingReqBody = {
    curr_id: string;
    action: 'historical_data';
    st_date: string;
    end_date: string;
    interval_sec: StockHistoryInterval;
};

const { getOrThrow, commonHeaders, createBody } = extractorUtils;

const url = 'https://www.investing.com/instruments/HistoricalDataAjax';

export const extractStockHistory = async ({
    pairId: pairIdJoined, startDate, endDate, interval
}: Partial<StockHistoryReqParams>): Promise<HistoryData[]> => {

    const pairIdList = getOrThrow(pairIdJoined).split(',');

    if(!pairIdList.length) {
        throw new functions.https.HttpsError('invalid-argument', 'Pair ID list empty');
    }

    const partialBody: Omit<InvestingReqBody, 'curr_id'> = {
        action: 'historical_data',
        st_date: getOrThrow(startDate),
        end_date: getOrThrow(endDate),
        interval_sec: getOrThrow(interval)
    };

    const fetchStockHistory = async (pairId: string) => {
        const rawBody: InvestingReqBody = {
            curr_id: getOrThrow(pairId),
            ...partialBody
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

        if (trList[ 0 ].querySelector('td')?.textContent === 'No results found') {
            throw new Error('No results found');
        }

        const history = trList.map((tr): HistoryValue => {
            const tdList = tr.querySelectorAll('td');

            const getValue = (i: number) => {
                const item = getOrThrow(tdList.item(i), `td n°${i} is null`);

                return getOrThrow(item.getAttribute('data-real-value') ?? item.textContent);
            };

            return {
                time: +getValue(0),
                price: +getValue(1),
            };
        });

        return {
            id: +pairId,
            history
        };
    };

    return await Promise.all(pairIdList.map(fetchStockHistory));
};
