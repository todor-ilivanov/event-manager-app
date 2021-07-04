import { Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import EventsToolbar from './EventsToolbar';
import SignupForm from './SignupForm';

const UnauthEventManager = () => {
    const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
    const [signupDialogOpen, setSignupDialogOpen] = useState<boolean>(false);

    return (
        <>
            <EventsToolbar
                setLoginDialogOpen={setLoginDialogOpen}
                setSignupDialogOpen={setSignupDialogOpen}
            />
            <Grid
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justify="center"
                style={{marginTop: 250}}
            >
                <Grid item xs={12}>
                    <Typography variant="h4" component="h2" align="center">
                        Welcome to the Event Manager App!
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h2" align="center">
                        Create and manage events with ease.
                    </Typography>
                </Grid>
            </Grid>
            <SignupForm
                signupDialogOpen={signupDialogOpen}
                handleDialogClose={() => setSignupDialogOpen(false)}
            />
            <LoginForm
                loginDialogOpen={loginDialogOpen}
                handleDialogClose={() => setLoginDialogOpen(false)}
            />
        </>
    );
};

export default UnauthEventManager;
