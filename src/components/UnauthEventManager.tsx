import {
    Box,
    Button,
    Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import LoginForm from './LoginForm';

const UnauthEventManager = () => {
    const [loginDialogOpen, setLoginDialogOpenOpen] = useState<boolean>(false);

    const handleDialogOpen = () => {
        setLoginDialogOpenOpen(true);
    };

    const handleDialogClose = () => {
        setLoginDialogOpenOpen(false);
    };

    return (
        <>
            <Typography component="div">
                <Box textAlign="center" m={1}>
                    Welcome to the Event Manager App!
                </Box>
                <Box textAlign="center" m={1}>
                    Create and manage events with ease.
                </Box>
                <Box textAlign="center" m={1}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDialogOpen}
                    >
                        Log In
                    </Button>
                </Box>
            </Typography>
            <LoginForm loginDialogOpen={loginDialogOpen} handleDialogClose={handleDialogClose} />
        </>
    );
};

export default UnauthEventManager;
