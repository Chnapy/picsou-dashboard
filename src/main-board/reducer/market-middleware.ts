import { createMiddleware } from '../../main/create-middleware';


export const marketMiddleware = createMiddleware(() => api => next => {

    return async action => {

        return next(action);
    };
});
