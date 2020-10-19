import { BoardValueInfos } from '@picsou/shared';
import { ReferentialHistoryData } from '@picsou/shared/src/database';
import * as admin from 'firebase-admin';
import * as puppeteer from 'puppeteer';
import { requireEnv } from '../env';

const urls = {
    login: 'https://wwws.linxo.com/auth.page#Login',
    accounts: 'https://wwws.linxo.com/secured/profile.page#Accounts'
} as const;

const classNames = {
    item: '.GD3OLCIDG-D',
    itemOpenDetails: '.GD3OLCIDE0D',
    itemName: '.GD3OLCIDC0D',
    itemValue: '.GD3OLCIDE-D'
} as const;

export type ParsedValue = {
    id: number;
    name: string;
    value: number;
};

export const cronCashValues = async () => {

    const linxoCredentials = {
        username: requireEnv('LINXO_USERNAME'),
        password: requireEnv('LINXO_PASSWORD')
    };

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(urls.login);
    const [ username, password, submit ] = await Promise.all([
        page.waitForSelector('input[name="username"]', { visible: true }),
        page.waitForSelector('input[name="password"]', { visible: true }),
        page.waitForSelector('button[type="submit"]', { visible: true })
    ]);
    await username.type(linxoCredentials.username);
    await password.type(linxoCredentials.password);
    await submit.click();

    await page.waitForNavigation();

    await page.goto(urls.accounts);

    await page.waitForSelector(classNames.item, { visible: true });

    const values: ParsedValue[] = await page.evaluate((classNamesObj: typeof classNames): ParsedValue[] =>
        Array.from(document.querySelectorAll(classNamesObj.item)).map(item => {

            if (!item.querySelector('.GD3OLCIDG0D-open')) {

                const openEl = item.querySelector(classNamesObj.itemOpenDetails) as HTMLElement;
                openEl.click();
            }

            const idEl = Array.from(item.querySelectorAll('td'))
                .find(s => {
                    const child = s.childNodes[ 0 ];

                    return child.nodeType === Node.TEXT_NODE && child.textContent?.includes('Compte n°')
                })!
                .querySelector('span')!;

            const nameEl = item.querySelector(classNamesObj.itemName)!;
            const valueEl = item.querySelector(classNamesObj.itemValue)!;

            const id = +idEl.textContent!.replace(/\D/g, '');
            const name = nameEl.textContent!.replace(/\s\(.*\)/, '');
            const value = Number.parseFloat(valueEl.textContent!.replace(/\s/g, '').replace(',', '.'));

            return {
                id,
                name,
                value
            };
        }),
        classNames);

    await valuesToDB(values);

    await browser.close();
};

export const valuesToDB = (values: ParsedValue[]) => Promise.all([
    valuesToDBReferential(values),
    valuesToDBValues(values)
]);

const valuesToDBReferential = async (values: ParsedValue[]) => {

    const now = Date.now();

    const dbCash = admin.database().ref('referentials/cash');

    const dbCashIds = dbCash.child('valuesIds');
    const dbCashValues = dbCash.child('values');
    const dbCashHistories = dbCash.child('histories');

    await Promise.all([
        dbCashIds.set(values.map(v => v.id)),
        ...values.map(async ({ id, name, value }) => {
            const dbValue = dbCashValues.child(id.toString());
            const dbHistory = dbCashHistories.child(id.toString());

            const initialValue: ReferentialHistoryData = {
                name
            };
            const dbHistoryValue = dbHistory.child(now.toString());

            await Promise.all([
                dbValue.set(initialValue),
                dbHistoryValue.set(value)
            ]);
        })
    ]);
};

const valuesToDBValues = async (values: ParsedValue[]) => {
    const dbCash = admin.database().ref('values/cash');

    await Promise.all(values.map(async (value) => {

        const dbValue = dbCash.child(value.id.toString());

        const v = await dbValue.once('value');

        if (!v.exists()) {
            const initialValue: Omit<BoardValueInfos, 'history'> = {
                id: value.id,
                board: 'cash',
                name: value.name,
                currentValue: value.value,
                oldValueList: [
                    {
                        oldValue: value.value,
                        quantity: 1
                    }
                ]
            };
            await dbValue.set(initialValue);
        } else {

            await Promise.all([
                dbValue.child('name').set(value.name),
                dbValue.child('currentValue').set(value.value)
            ]);
        }

    }));
};
