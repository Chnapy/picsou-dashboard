import { getFirebase } from '../../firebase/create-firebase-app';
import { createMiddleware } from '../../main/create-middleware';
import { AuthErrorAction, AuthLogoutAction, AuthSuccessAction } from './auth-actions';

const checkDatabasePermissions = async () => {
    await getFirebase().database().ref('foo').once('value');
};

export const authMiddleware = createMiddleware(() => api => next => {

    let hasPrevious = false;

    const auth = getFirebase().auth();

    auth.onAuthStateChanged(async user => {

        if (user) {
            if (!hasPrevious) {

                try {
                    await checkDatabasePermissions();

                    hasPrevious = true;
                    return api.dispatch(
                        AuthSuccessAction()
                    );
                } catch (e) {
                    hasPrevious = false;
                    await auth.signOut();
                    return api.dispatch(AuthErrorAction({
                        title: `Auth failed with ${user.email}`,
                        content: [
                            `You cannot use this account, it's probably not white-listed (error code: ${e.code}).`,
                            'Consider access app as a guest.'
                        ]
                    }));
                }
            }
        } else {
            hasPrevious = false;
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
