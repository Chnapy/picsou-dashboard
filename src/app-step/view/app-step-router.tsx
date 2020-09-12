import React from 'react';
import { useSelector } from 'react-redux';
import { AuthView } from '../../auth/view/auth-view';
import { FooView } from '../../foo/view/foo-view';
import { switchUtil } from '../../util';

export const AppStepRouter: React.FC = () => {

    const appStep = useSelector(state => state.appStep);

    return switchUtil(appStep, {
        auth: () => <AuthView/>,
        main: () => <FooView />
    })();
};
