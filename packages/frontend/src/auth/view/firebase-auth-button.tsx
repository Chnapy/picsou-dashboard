import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import React from 'react';
import { getFirebase } from '../../firebase/create-firebase-app';
import { UIButton, UIButtonProps } from '../../ui-components/button/ui-button';

// Promise that resolves unless the FirebaseUI instance is currently being deleted.
let firebaseUiDeletion = Promise.resolve();

type FirebaseAuthButtonProps = UIButtonProps & {
    uiConfig: firebaseui.auth.Config;
};

export const FirebaseAuthButton: React.FC<FirebaseAuthButtonProps> = ({ uiConfig, ...buttonProps }) => {
    const firebaseAuth = getFirebase().auth();

    const thisRef = React.useRef<{
        firebaseUiWidget?: firebaseui.auth.AuthUI;
        userSignedIn: boolean;
        unregisterAuthObserver: firebase.Unsubscribe;
        wrapper?: HTMLElement;
    }>({
        userSignedIn: false,
        unregisterAuthObserver: () => { }
    });

    React.useEffect(() => {
        const thisCur = thisRef.current!;

        // Wait in case the firebase UI instance is being deleted.
        // This can happen if you unmount/remount the element quickly.
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        firebaseUiDeletion.then(() => {

            // Get or Create a firebaseUI instance.
            const firebaseUiWidget = firebaseui.auth.AuthUI.getInstance()
                || new firebaseui.auth.AuthUI(firebaseAuth);
            thisCur.firebaseUiWidget = firebaseUiWidget;

            if (uiConfig.signInFlow === 'popup') {
                firebaseUiWidget.reset();
            }

            // We track the auth state to reset firebaseUi if the user signs out.
            thisCur.userSignedIn = false;
            thisCur.unregisterAuthObserver = firebaseAuth.onAuthStateChanged((user) => {
                if (!user && thisCur.userSignedIn) {
                    firebaseUiWidget.reset();
                }
                thisCur.userSignedIn = !!user;
            });

            const wrapper = document.createElement('div');
            thisCur.wrapper = wrapper;

            // Render the firebaseUi Widget.
            firebaseUiWidget.start(wrapper, uiConfig);
        });

        return () => {
            firebaseUiDeletion = firebaseUiDeletion.then(() => {
                thisCur.unregisterAuthObserver();
                return thisCur.firebaseUiWidget?.delete();
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ firebaseAuth, uiConfig.signInFlow ]);

    return <UIButton
        {...buttonProps}
        onClick={() => {
            const { wrapper } = thisRef.current!;

            wrapper!.querySelector('button')!.click();
        }}
    />
};