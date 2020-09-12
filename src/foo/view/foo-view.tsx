import { Box, Container, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { UIButton } from '../../ui-components/button/ui-button';
import { UITypography } from '../../ui-components/typography/ui-typography';
import { FooDecrementAction, FooIncrementAction } from '../reducer/foo-actions';

export const FooView: React.FC = () => {

    const foo = useSelector(state => state.foo);

    const actions = useAppDispatch({
        increment: () => FooIncrementAction(1),
        decrement: () => FooDecrementAction(1),
        reset: () => FooDecrementAction(foo)
    });

    return <Container style={{ height: '100vh' }}>

        <Box height='100%' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>

            <Grid container spacing={2} justify='center' alignItems='center'>
                <Grid item>
                    <UITypography variant='body1'>
                        foo value: <b>{foo}</b>
                    </UITypography>

                </Grid>

                <Grid item>
                    <UIButton
                        variant='primary'
                        onClick={actions.increment}>Increment</UIButton>

                </Grid>
                <Grid item>
                    <UIButton
                        variant='primary'
                        onClick={actions.decrement}>Decrement</UIButton>

                </Grid>
                <Grid item>
                    <UIButton
                        variant='secondary'
                        onClick={actions.reset}>Reset</UIButton>
                </Grid>
            </Grid>

        </Box>
    </Container >
};
