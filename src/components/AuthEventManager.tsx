import React, { useEffect, useState } from 'react';
import { Container, Button } from '@material-ui/core';
import { useAppContext } from '../AppContext';
import { Auth } from 'aws-amplify';
import { useEvents } from '../hooks/EventsApiHooks';
import { EventDTO } from '../models/Event';
import EventsDisplay from './EventsDisplay';
import { Alert } from '@material-ui/lab';
import CreateEventDialog from './CreateEventDialog';

const AuthEventManager = () => {

    const { setIsAuthenticated } = useAppContext();
    const [shouldFetchEvents, setShouldFetchEvents] = useState<boolean>(true);
    const [events, setEvents] = useState<EventDTO[]>([]);
    const [openCreateEventDialog, setOpenCreateEventDialog] = useState<boolean>(false);

    const {
        data: eventsResponse,
        isLoading: isLoadingEvents,
        error: eventsFetchError
    } = useEvents(shouldFetchEvents);

    useEffect(() => {
        if(eventsResponse) {
            setEvents(eventsResponse);
            setShouldFetchEvents(false);
        }
    }, [eventsResponse]);

    const handleLogout = async () => {
        try {
            await Auth.signOut();
            setIsAuthenticated(false);
            console.log('Sign out successful');
        } catch(error) {
            console.error('Error signing out: ', error);
        }
    };

    const handleOpenCreateEventDialog = () => {
        setOpenCreateEventDialog(true);
    };

    const handleCloseCreateEventDialog = () => {
        setOpenCreateEventDialog(false);
    };

    return (
        <>
            <Button
                color="primary"
                variant="contained"
                onClick={handleOpenCreateEventDialog}
            >
                + New Event
            </Button>
            <Button onClick={handleLogout}>Log Out</Button>
            <EventsDisplay events={events} isLoading={isLoadingEvents} />
            <Container maxWidth="sm">
                {
                    eventsFetchError ? <Alert severity="error">
                        An error has occurred when getting your events.
                    </Alert> : <></>
                }
            </Container>
            <CreateEventDialog
                open={openCreateEventDialog}
                handleDialogClose={handleCloseCreateEventDialog}
                setShouldFetchEvents={setShouldFetchEvents}
            />
        </>
    );
};

export default AuthEventManager;
