import {
    Box,
    Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import EventsToolbar from './EventsToolbar';

const UnauthEventManager = () => {
    const [loginDialogOpen, setLoginDialogOpenOpen] = useState<boolean>(false);

    return (
        <>
            <EventsToolbar setDialogOpen={setLoginDialogOpenOpen} />
            <Typography component="div">
                <Box textAlign="center" m={1}>
                    Welcome to the Event Manager App!
                </Box>
                <Box textAlign="center" m={1}>
                    Create and manage events with ease.
                </Box>
            </Typography>
            <LoginForm
                loginDialogOpen={loginDialogOpen}
                handleDialogClose={() => setLoginDialogOpenOpen(false)}
            />
        </>
    );
};

export default UnauthEventManager;
