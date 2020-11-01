import { routes } from '@picsou/shared';
import { getFirebase } from '../../firebase/create-firebase-app';
import { createFetcher } from '../fetcher-types';

const doubleDayInterval = 172800;  // 48h in seconds

const midDay = 43200;   // 12h in seconds

export const createGoldFetcher = createFetcher(() => {
    const fbFunctions = getFirebase().functions();

    const requestGoldHistory = routes.goldHistory.createFetcher(fbFunctions);

    return {
        fetchCurrentValue: async ([ id ]) => {

            const { data } = await requestGoldHistory({
                id,
                latestOnly: true,
                interval: midDay
            });

            return data.map(({ id, history }) => ({
                id,
                currentValue: history[ 0 ],
                previousValue: history[ 2 ]
            }));
        },
        fetchHistory: async ([ id ]) => {

            const { data } = await requestGoldHistory({
                id,
                interval: doubleDayInterval
            });

            return data;
        }

    };
});
