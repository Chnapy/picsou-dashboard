import { routes } from '@picsou/shared';
import { getFirebase } from '../../firebase/create-firebase-app';
import { createFetcher } from '../fetcher-types';

export const createGoldFetcher = createFetcher(() => {
    const fbFunctions = getFirebase().functions();

    const requestGoldHistory = routes.goldHistory.createFetcher(fbFunctions);

    return {
        fetchCurrentValue: async ([ id ]) => {

            const { data } = await requestGoldHistory({
                id,
                latestOnly: true,
                interval: 600
            });

            return data.map(({ id, history }) => ({
                id,
                currentValue: history[ 0 ]
            }));
        },
        fetchHistory: async ([ id ]) => {

            const { data } = await requestGoldHistory({
                id,
                interval: 172800
            });

            return data;
        }

    };
});
