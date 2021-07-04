import { Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import EventsToolbar from './EventsToolbar';

const UnauthEventManager = () => {
    const [loginDialogOpen, setLoginDialogOpenOpen] = useState<boolean>(false);

    return (
        <>
            <EventsToolbar setDialogOpen={setLoginDialogOpenOpen} />
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
            <LoginForm
                loginDialogOpen={loginDialogOpen}
                handleDialogClose={() => setLoginDialogOpenOpen(false)}
            />
        </>
    );
};

export default UnauthEventManager;
