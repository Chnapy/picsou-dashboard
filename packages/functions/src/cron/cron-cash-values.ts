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

            const id = +idEl.textContent!;
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

export const valuesToDB = async (values: ParsedValue[]) => {

    const now = Date.now();

    const dbCash = admin.database().ref('referentials/cash');

    await Promise.all(
        values.map(async ({ id, name, value }) => {
            const dbValue = dbCash.child(id.toString());
            const dbValueId = dbValue.child('id');
            const s = await dbValueId.once('value');

            if (!s.exists()) {
                const initialValue: ReferentialHistoryData = {
                    id,
                    name,
                    history: {}
                };
                await dbValue.set(initialValue);
            }

            const dbHistory = dbValue.child('history').child(now.toString());
            await dbHistory.set(value);
        })
    );
};
