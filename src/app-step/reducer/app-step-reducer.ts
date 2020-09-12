import { createRichReducer } from '../../main/create-rich-reducer';
import { AuthSuccessAction } from '../../auth/reducer/auth-actions';

export type AppStepState = 'auth' | 'main';

const initialState: AppStepState = 'auth' as AppStepState;

export const appStepReducer = createRichReducer(initialState, () => ({
    [AuthSuccessAction.type]: (state, action) => 'main'
}));
