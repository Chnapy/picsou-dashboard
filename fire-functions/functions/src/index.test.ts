import { requestStockHistory } from './index';
import { fbTester } from './fb-tester';
import { getStockHistoryValuesTestData } from '../../../shared/tests/stock-history-values-test';


describe('routes', () => {

    it('requestStockHistory', async () => {

        const request = fbTester.wrap(requestStockHistory);

        const { paramsQuery, expectedData } = getStockHistoryValuesTestData();

        const data = await request(paramsQuery);

        expect(data).toEqual(expectedData);
    });
});
