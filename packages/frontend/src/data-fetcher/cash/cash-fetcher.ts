import { HistoryValue } from '@picsou/shared';
import { getFirebase } from '../../firebase/create-firebase-app';
import { createFetcher, FetchCurrentValueData, FetchHistoryData } from '../fetcher-types';

export const createCashFetcher = createFetcher(() => {

    const dbRoot = getFirebase().database();

    return {

        fetchCurrentValue: async (idList) => {
            const dbCash = dbRoot.ref('values/cash');

            return Promise.all(idList.map(async (id): Promise<FetchCurrentValueData[ number ]> => {

                const snapPrice = await dbCash.child(id.toString()).child('currentValue').once('value');

                return {
                    id,
                    currentValue: {
                        time: Date.now(),
                        price: snapPrice.val()
                    }
                };
            }));
        },

        fetchHistory: async (idList) => {

            const dbCash = dbRoot.ref('referentials/cash/histories');

            return Promise.all(idList.map(async (id): Promise<FetchHistoryData[ number ]> => {

                const historyMap: Record<string, string> = (await dbCash.child(id.toString()).once('value')).val();
                const history = Object.entries(historyMap)
                    .reduce<HistoryValue[]>((acc, [ k, v ]) => {
                        acc.push({
                            time: +k,
                            price: +v
                        });

                        return acc;
                    }, []);

                return {
                    id,
                    history
                };
            }));
        }
    };
});
