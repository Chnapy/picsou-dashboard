
export type FetchStockSearchParams = {
    search: string;
};

export type FetchStockSearchDataItem = {
    pairId: number;
    name: string;
    flag: string;   // USA
    link: string;   // relative link '/etfs/spdr-dj-euro-stoxx-50'
    symbol: string;
    type: string;
    pair_type_raw: string;  // etf
    pair_type: string;  // etf
    countryID: number;
    sector: number;
    region: number;
    industry: number;
    isCrypto: boolean;
    exchange: string;
    exchangeID: number;
};

export type FetchStockSearchData = {
    quotes: FetchStockSearchDataItem[];
};
