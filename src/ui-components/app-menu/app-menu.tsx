import { Button, Paper, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppStepStateNoAuth } from '../../app-step/reducer/app-step-reducer';

const appStepMap: Record<AppStepStateNoAuth, string> = {
    main: 'Main',
};

const useStyles = makeStyles(() => ({
    container: {
        '& > .MuiGrid-item': {
            paddingTop: 0,
            paddingBottom: 0
        }
    }
}));

export const AppMenu: React.FC = () => {
    const classes = useStyles();

    const currentAppStep = useSelector(state => state.appStep);

    return <Paper elevation={0}>
        <Grid className={classes.container} container spacing={2} alignItems='center' justify='center'>
            {(Object.keys(appStepMap) as AppStepStateNoAuth[]).map(appStep => (
                <Grid key={appStep} item>
                    <Button color={appStep === currentAppStep ? 'primary' : 'default'}>
                        {appStepMap[ appStep ]}
                    </Button>
                </Grid>
            ))}
        </Grid>
    </Paper>;
};
