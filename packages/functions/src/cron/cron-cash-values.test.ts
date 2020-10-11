import { cronCashValues, valuesToDB } from './cron-cash-values';

let dbSettedValues: Record<string, any> = {};

let existsFn = () => false;

jest.mock('firebase-admin', () => {

    const createDbRef = (basepath: string) => {

        return {
            ref: createDbRef,
            child: (path: string) => createDbRef(basepath + '/' + path),
            once: async () => ({
                exists: () => existsFn()
            }),
            set: async (val: any) => {
                dbSettedValues[ basepath ] = val;
                // console.log('SET', basepath, '=>', val);
            },
        };
    };

    return {
        database: createDbRef
    };
});

describe('cron > cash values', () => {

    const dateNow = Date.now;

    beforeEach(() => {
        global.Date.now = dateNow;
        existsFn = () => false;
        Object.keys(dbSettedValues).forEach(k => {
            delete dbSettedValues[k];
        });
    });

    it('runs without crashing', async () => {
        await cronCashValues();
    }, 30000);

    it('sets values to DB', async () => {
        global.Date.now = () => 123456;

        await valuesToDB([
            { id: 2, name: 'foo', value: 123 },
            { id: 5, name: 'bar', value: 543 },
        ]);

        expect(dbSettedValues).toEqual({
            'referentials/cash/2': {
                id: 2,
                name: 'foo',
                history: expect.any(Object)
            },
            'referentials/cash/2/history/123456': 123,
            'referentials/cash/5': {
                id: 5,
                name: 'bar',
                history: expect.any(Object)
            },
            'referentials/cash/5/history/123456': 543,
        });
    });

    it('sets new value day-to-day', async () => {
        global.Date.now = () => 123456;

        await valuesToDB([
            { id: 2, name: 'foo', value: 123 },
            { id: 5, name: 'bar', value: 543 },
        ]);

        existsFn = () => true;

        global.Date.now = () => 321432;

        await valuesToDB([
            { id: 2, name: 'foo', value: 213 },
            { id: 5, name: 'bar', value: 432 },
        ]);

        expect(dbSettedValues).toEqual({
            'referentials/cash/2': {
                id: 2,
                name: 'foo',
                history: expect.any(Object)
            },
            'referentials/cash/2/history/123456': 123,
            'referentials/cash/5': {
                id: 5,
                name: 'bar',
                history: expect.any(Object)
            },
            'referentials/cash/5/history/123456': 543,

            'referentials/cash/2/history/321432': 213,
            'referentials/cash/5/history/321432': 432,
        });
    });

});
