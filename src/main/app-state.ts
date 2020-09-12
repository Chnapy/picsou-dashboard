import { AppStepState } from '../app-step/reducer/app-step-reducer';
import { AuthState } from '../auth/reducer/auth-reducer';
import { FooState } from '../foo/reducer/foo-reducer';

export type AppState = {

    appStep: AppStepState;

    auth: AuthState;


    foo: FooState;

};
