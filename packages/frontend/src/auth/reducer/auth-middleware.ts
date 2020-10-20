import { getFirebase } from '../../firebase/create-firebase-app';
import { createMiddleware } from '../../main/create-middleware';
import { AuthLogoutAction, AuthSuccessAction } from './auth-actions';

export const authMiddleware = createMiddleware(() => api => next => {

    let hasPrevious = false;

    getFirebase().auth().onAuthStateChanged(user => {

        if (user) {
            if (!hasPrevious) {
                hasPrevious = true;

                return api.dispatch(
                    AuthSuccessAction()
                );
            }
        } else {
            return api.dispatch(
                AuthLogoutAction()
            );
        }
    });

    return async action => {
        const ret = next(action);

        return ret;
    };
});
