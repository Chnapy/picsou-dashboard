import { AuthLogoutAction, AuthSuccessAction } from '../../auth/reducer/auth-actions';
import { createRichReducer } from '../../main/create-rich-reducer';

export type AppStepState = 'auth' | 'main';

export type AppStepStateNoAuth = Exclude<AppStepState, 'auth'>;

const initialState: AppStepState = 'auth' as AppStepState;

export const appStepReducer = createRichReducer(initialState, () => ({
    [AuthSuccessAction.type]: () => 'main',
    [AuthLogoutAction.type]: () => 'auth'
}));
