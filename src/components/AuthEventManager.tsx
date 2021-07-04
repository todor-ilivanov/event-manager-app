import React, { useEffect, useState } from 'react';
import { Container, Backdrop, CircularProgress } from '@material-ui/core';
import { useEvents } from '../hooks/EventsApiHooks';
import { EventDTO } from '../models/Event';
import EventsDisplay from './EventsDisplay';
import { Alert } from '@material-ui/lab';
import CreateEventDialog from './CreateEventDialog';
import EventsToolbar from './EventsToolbar';

const AuthEventManager = () => {

    const [shouldFetchEvents, setShouldFetchEvents] = useState<boolean>(true);
    const [events, setEvents] = useState<EventDTO[]>([]);
    const [createEventDialogOpen, setCreateEventDialogOpen] = useState<boolean>(false);

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

    return (
        <>
            <EventsToolbar
                setCreateEventDialogOpen={setCreateEventDialogOpen}
            />
            {
                !isLoadingEvents ?
                    <EventsDisplay events={events} />
                    : <Backdrop open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
            }
            <Container maxWidth="sm">
                {
                    eventsFetchError ? <Alert severity="error">
                        An error has occurred when getting your events.
                    </Alert> : <></>
                }
            </Container>
            <CreateEventDialog
                open={createEventDialogOpen}
                handleDialogClose={() => setCreateEventDialogOpen(false)}
                setShouldFetchEvents={setShouldFetchEvents}
            />
        </>
    );
};

export default AuthEventManager;
