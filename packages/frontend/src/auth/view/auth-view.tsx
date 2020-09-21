import { Box, Card, CardContent } from '@material-ui/core';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { firebaseAuthClientID, getFirebase } from '../../firebase/create-firebase-app';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { UITypography } from '../../ui-components/typography/ui-typography';
import { AuthSuccessAction } from '../reducer/auth-actions';

const getFirebaseUIConfig = (dispatchAuthSuccess: () => void): firebaseui.auth.Config => ({
    signInFlow: 'popup',
    signInOptions: [
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            clientId: firebaseAuthClientID
        }
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
    callbacks: {
        signInSuccessWithAuthResult: user => {
            dispatchAuthSuccess();

            return false;
        },
        
    }
});

export const AuthView: React.FC = () => {

    const firebaseAuth = getFirebase().auth();

    const { dispatchAuthSuccess } = useAppDispatch({
        dispatchAuthSuccess: AuthSuccessAction
    });

    const uiConfig = getFirebaseUIConfig(dispatchAuthSuccess);

    return <>

        <Box display='flex' flexDirection='column' height='100%' justifyContent='center' alignItems='center'>

            <Card>
                <CardContent>
                    <UITypography variant='h2' gutterBottom>
                        Picsou dashboard
                    </UITypography>

                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
                </CardContent>
            </Card>
        </Box>
    </>;
};
