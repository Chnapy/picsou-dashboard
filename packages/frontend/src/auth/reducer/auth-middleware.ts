import { getFirebase } from '../../firebase/create-firebase-app';
import { createMiddleware } from '../../main/create-middleware';
import { AuthSuccessAction } from './auth-actions';

export const authMiddleware = createMiddleware(() => api => next => {

    getFirebase().auth().onAuthStateChanged(user => {

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
