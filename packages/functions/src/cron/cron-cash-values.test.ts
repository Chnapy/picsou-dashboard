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
            delete dbSettedValues[ k ];
        });
    });

    it('runs without crashing', async () => {
        await cronCashValues();
    }, 30000);

    it('sets values to DB referential', async () => {
        global.Date.now = () => 123456;

        await valuesToDB([
            { id: 2, name: 'foo', value: 123 },
            { id: 5, name: 'bar', value: 543 },
        ]);

        expect(dbSettedValues).toMatchObject({
            'referentials/cash/values/2': {
                name: 'foo'
            },
            'referentials/cash/histories/2/123456': 123,
            'referentials/cash/values/5': {
                name: 'bar'
            },
            'referentials/cash/histories/5/123456': 543,
            'referentials/cash/valuesIds': [ 2, 5 ]
        });
    });

    it('sets new value day-to-day to referential', async () => {
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

        expect(dbSettedValues).toMatchObject({
            'referentials/cash/values/2': {
                name: 'foo'
            },
            'referentials/cash/histories/2/123456': 123,
            'referentials/cash/values/5': {
                name: 'bar'
            },
            'referentials/cash/histories/5/123456': 543,

            'referentials/cash/histories/2/321432': 213,
            'referentials/cash/histories/5/321432': 432,
            'referentials/cash/valuesIds': [ 2, 5 ]
        });
    });

    it('set current value to DB', async () => {
        global.Date.now = () => 123456;

        await valuesToDB([
            { id: 2, name: 'foo', value: 123 },
            { id: 5, name: 'bar', value: 543 },
        ]);

        existsFn = () => true;

        global.Date.now = () => 321432;

        await valuesToDB([
            { id: 2, name: 'foo2', value: 213 },
            { id: 5, name: 'bar', value: 432 },
        ]);

        expect(dbSettedValues).toMatchObject({
            'values/cash/2': {
                board: 'cash',
                id: 2,
                name: 'foo',
                currentValue: 123,
                oldValueList: [{
                    oldValue: 123,
                    quantity: 1
                }]
            },
            'values/cash/2/name': 'foo2',
            'values/cash/2/currentValue': 213,
            
            'values/cash/5': {
                board: 'cash',
                id: 5,
                name: 'bar',
                currentValue: 543,
                oldValueList: [{
                    oldValue: 543,
                    quantity: 1
                }]
            },
            'values/cash/5/name': 'bar',
            'values/cash/5/currentValue': 432
        });
    });
});
