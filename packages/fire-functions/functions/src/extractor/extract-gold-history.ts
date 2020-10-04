import { GoldHistoryReqParams, HistoryData } from '@picsou/shared';
import fetch, { Headers } from 'node-fetch';
import { extractorUtils } from './extractor-utils';


type BullionReqBody = {
    // version?: 'v2';
    // chartType?: 'CHART_POINTS';
    securityId: 'AUX' | 'AGX';  // AUX = gold, AGX = silver
    valuationSecurityId: 'EUR' | 'USD';

    // interval between values, in seconds
    interval: number;
};

type BullionResData = BullionReqBody & {
    name: string;
    batch: null;
    plottedPoints: number;
    prices: {
        seriesId: number;
        latestPrice: number;
        high: number;
        low: number;
        priceTime: number;
        latestPriceInTroyOunces: number;
    }[];
};

const { getOrThrow, commonHeaders } = extractorUtils;

const url = 'https://www.galmarley.com/prices/prices.json';

export const extractGoldHistory = async ({ id: id_, latestOnly, interval }: Partial<GoldHistoryReqParams>): Promise<HistoryData[]> => {

    const id = getOrThrow(id_);

    const rawBody: BullionReqBody = {
        securityId: 'AUX',
        valuationSecurityId: 'EUR',
        interval: getOrThrow(interval)
    };

    const finalUrl = new URL(url);

    Object.entries(rawBody).forEach(([ key, value ]) => {
        finalUrl.searchParams.set(key, value.toString());
    });

    const res = await fetch(finalUrl, {
        method: 'POST',
        headers: new Headers(commonHeaders),
    });

    const data: BullionResData = await res.json();

    const dataList = latestOnly
        ? data.prices.slice(0, 1)
        : data.prices;

    return [ {
        id,
        history: dataList.map(({ latestPrice, priceTime }) => ({
            price: latestPrice,
            time: priceTime
        }))
    } ];
};
