import { Box, Card, CardContent, Grid, Snackbar, SvgIcon, SvgIconProps } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/PersonSharp';
import { Alert, AlertTitle } from '@material-ui/lab';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppTitle } from '../../app-step/view/app-loading';
import { firebaseAuthClientID } from '../../firebase/create-firebase-app';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { GithubRepoButton } from '../../ui-components/app-header/github-repo-button';
import { UIButton } from '../../ui-components/button/ui-button';
import { actVisitEnter } from '../../visit/visit-act';
import { AuthErrorRemoveAction, AuthSuccessAction } from '../reducer/auth-actions';
import { AuthError } from '../reducer/auth-reducer';
import { FirebaseAuthButton } from './firebase-auth-button';

const GoogleIcon: React.FC<SvgIconProps> = props => (
    <SvgIcon {...props}>
        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
    </SvgIcon>
);

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

    const currentError = useSelector(state => state.auth.errors[ 0 ]);

    const { dispatchAuthSuccess, dispatchErrorRemove, dispatchActVisitEnter } = useAppDispatch({
        dispatchAuthSuccess: AuthSuccessAction,
        dispatchErrorRemove: AuthErrorRemoveAction,
        dispatchActVisitEnter: actVisitEnter
    });

    const uiConfig = getFirebaseUIConfig(dispatchAuthSuccess);

    const renderError = ({ id, title, content }: AuthError) => (
        <Snackbar open>
            <Alert severity='error' onClose={() => dispatchErrorRemove({ id })}>
                <AlertTitle>{title}</AlertTitle>
                {content.map((line, i) => <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>)}
            </Alert>
        </Snackbar>
    );

    return <Box
        position='relative' display='flex' flexDirection='column'
        height='100%' py={8}
        justifyContent='center' alignItems='center'
    >

        <Box position='absolute' bottom={0} right={0} mb={1}>
            <GithubRepoButton />
        </Box>

        <Card style={{ overflow: 'auto' }}>
            <CardContent>
                <Grid container direction='column' alignItems='center' spacing={2}>
                    <Grid item>
                        <AppTitle withFilter />
                    </Grid>

                    <Grid item xs>
                        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt='Logo' style={{ filter: 'drop-shadow(-15px 10px 0 rgba(0,0,0,0.25))' }} />
                    </Grid>

                    <Grid item>
                        <FirebaseAuthButton uiConfig={uiConfig} variant='primary' startIcon={<GoogleIcon style={{ width: '0.8em', height: '0.8em' }} />}>
                            Enter secret room
                        </FirebaseAuthButton>
                    </Grid>

                    <Grid item>
                        <UIButton startIcon={<PersonIcon />} onClick={() => dispatchActVisitEnter()}>
                            Visit as a guest
                    </UIButton>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>

        {currentError && renderError(currentError)}
    </Box>;
};
