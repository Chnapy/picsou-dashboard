import { AuthLogoutAction } from '../../auth/reducer/auth-actions';
import { getFirebase } from '../../firebase/create-firebase-app';
import { createAct } from '../../main/create-act';

export const logOutAct = createAct(() => async (dispatch, getState) => {

    if (getState().auth.isVisitor) {
        dispatch(AuthLogoutAction());
    } else {
        await getFirebase().auth().signOut();
    }
});
