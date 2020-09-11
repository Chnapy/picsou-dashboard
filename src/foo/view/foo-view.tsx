import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Button, Box, Grid } from '@material-ui/core';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
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
                    <Typography variant='body1'>
                        foo value: <b>{foo}</b>
                    </Typography>

                </Grid>

                <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={actions.increment}>Increment</Button>

                </Grid>
                <Grid item>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={actions.decrement}>Decrement</Button>

                </Grid>
                <Grid item>
                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={actions.reset}>Reset</Button>
                </Grid>
            </Grid>

        </Box>
    </Container >
};
