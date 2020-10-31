import { AuthLogoutAction, AuthSuccessAction } from '../../auth/reducer/auth-actions';
import { createRichReducer } from '../../main/create-rich-reducer';
import { VisitEnterAction } from '../../visit/visit-actions';

export type AppStepState = 'auth' | 'main';

export type AppStepStateNoAuth = Exclude<AppStepState, 'auth'>;

const initialState: AppStepState = 'auth' as AppStepState;

export const appStepReducer = createRichReducer(initialState, () => ({
    [AuthSuccessAction.type]: () => 'main',
    [VisitEnterAction.type]: () => 'main',
    [AuthLogoutAction.type]: () => 'auth'
}));
