import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { useAppContext } from '../AppContext';
import { Auth } from 'aws-amplify';

type EventsToolbarProps = {
    setDialogOpen: (val: boolean) => void;
};

const EventsToolbar = (props: EventsToolbarProps) => {

    const { isAuthenticated, setIsAuthenticated } = useAppContext();
    const { setDialogOpen } = props;

    const handleLogout = async () => {
        try {
            await Auth.signOut();
            setIsAuthenticated(false);
            console.log('Sign out successful');
        } catch(error) {
            console.error('Error signing out: ', error);
        }
    };

    const renderAuthToolbar = () => {
        return (
            <>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setDialogOpen(true)}
                >
                    + New Event
                </Button>
                <Button onClick={handleLogout}>Log Out</Button>
            </>
        );
    };

    const renderUnauthToolbar = () => {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={() => setDialogOpen(true)}
            >
                Log In
            </Button>
        );
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {
                    isAuthenticated ? renderAuthToolbar() : renderUnauthToolbar()

                }
            </Toolbar>
        </AppBar>
    );
};

export default EventsToolbar;