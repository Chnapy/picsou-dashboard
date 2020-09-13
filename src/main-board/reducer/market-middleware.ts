import { createMiddleware } from '../../main/create-middleware';
import * as fi from 'finnhub';

console.log(fi);

export const marketMiddleware = createMiddleware(() => api => next => {

    return async action => {

        return next(action);
    };
});
