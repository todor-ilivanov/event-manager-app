import React from 'react';
import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import { useAppContext } from '../AppContext';
import { Auth } from 'aws-amplify';
import '../styles/eventsToolbar.css';

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

    return (
        <AppBar position="static">
            <Toolbar>
                <Grid
                    container
                    justify="space-between"
                >
                    <Grid item>
                        <Typography variant="h5" component="h2">
                            Event Manager App
                        </Typography>
                    </Grid>

                    {
                        isAuthenticated ?
                            <>
                                <Grid item>
                                    <Button
                                        color="inherit"
                                        className="new-event-button"
                                        onClick={() => setDialogOpen(true)}
                                    >
                                        + New Event
                                    </Button>
                                    <Button
                                        color="inherit"
                                        className="log-out-button"
                                        onClick={handleLogout}
                                    >
                                        Log Out
                                    </Button>
                                </Grid>
                            </>
                            :
                            <Grid item>
                                <Button
                                    color="inherit"
                                    className="log-in-button"
                                    onClick={() => setDialogOpen(true)}
                                >
                                    Log In
                                </Button>
                            </Grid>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default EventsToolbar;