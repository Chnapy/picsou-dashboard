import { getFirebase } from '../../firebase/create-firebase-app';
import { createMiddleware } from '../../main/create-middleware';
import { AuthSuccessAction } from './auth-actions';

export const authMiddleware = createMiddleware(() => api => next => {

    let hasPrevious = false;

    getFirebase().auth().onAuthStateChanged(user => {

        if (user && !hasPrevious) {
            hasPrevious = true;

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
