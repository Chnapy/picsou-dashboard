import { FetchStockSearchData, FetchStockSearchDataItem, FetchStockSearchParams } from '@picsou/shared';
import fetch, { Headers } from 'node-fetch';
import { extractorUtils } from './extractor-utils';

const { getOrThrow, commonHeaders, createBody } = extractorUtils;

const searchUrl = 'https://www.investing.com/search/service/SearchInnerPage';

const dataFilter = ({ isCrypto }: FetchStockSearchDataItem): boolean => !isCrypto;

export const extractStockSearch = async (params: Partial<FetchStockSearchParams>) => {

    const search = getOrThrow(params.search);

    const res = await fetch(searchUrl, {
        method: 'POST',
        headers: new Headers(commonHeaders),
        body: createBody({
            search_text: search
        })
    });

    const rawData: FetchStockSearchData = await res.json();

    return rawData.quotes.filter(dataFilter);
};
