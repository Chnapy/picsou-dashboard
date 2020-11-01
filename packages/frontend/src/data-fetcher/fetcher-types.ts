import { HistoryValue } from '@picsou/shared';

export type FetchCurrentValueData = {
    id: number;
    currentValue: HistoryValue;
    previousValue: HistoryValue | undefined;
}[];

export type FetchHistoryData = {
    id: number;
    history: HistoryValue[];
}[];

export type Fetcher = {
    fetchCurrentValue: (idList: number[]) => Promise<FetchCurrentValueData>;
    fetchHistory: (idList: number[]) => Promise<FetchHistoryData>;
};

export const createFetcher = <F extends Fetcher>(fn: () => F) => fn;
