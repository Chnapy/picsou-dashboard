import { createMiddleware } from '../../main/create-middleware';
import { AuthSuccessAction } from './auth-actions';

export const authMiddleware = createMiddleware(({ firebaseAuth }) => api => next => {

    firebaseAuth.onAuthStateChanged(user => {

        if (user) {
            return api.dispatch(
                AuthSuccessAction()
            );
        }
    });

    return async action => {
        const ret = next(action);

        return ret;
    };
});
