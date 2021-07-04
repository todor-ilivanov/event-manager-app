import React, { useEffect, useState } from 'react';
import { Container, Button } from '@material-ui/core';
import { useAppContext } from '../AppContext';
import { Auth } from 'aws-amplify';
import { useCreateNewEvent, useEvents } from '../hooks/EventsApiHooks';
import { EventDTO } from '../models/Event';
import { CreateEventRequest } from '../models/ApiRequests';
import EventsDisplay from './EventsDisplay';
import { Alert } from '@material-ui/lab';

const AuthEventManager = () => {

    const { setIsAuthenticated } = useAppContext();
    const [fetchEvents, setFetchEvents] = useState<boolean>(true);
    const [events, setEvents] = useState<EventDTO[]>([]);
    const [createEventRequest, setCreateEventRequest] = useState<CreateEventRequest>();

    const {
        data: eventsResponse,
        isLoading: isLoadingEvents,
        error: eventsFetchError
    } = useEvents(fetchEvents);

    const {
        data: createEventResponse,
        isLoading: isLoadingEventCreation,
        error: eventCreationError
    } = useCreateNewEvent(createEventRequest);

    useEffect(() => {
        if(eventsResponse) {
            setEvents(eventsResponse);
            setFetchEvents(false);
        }
        if(createEventResponse) {
            setCreateEventRequest(undefined);
            setFetchEvents(true);
        }
    }, [eventsResponse, createEventResponse, events]);

    const handleLogout = async () => {
        try {
            await Auth.signOut();
            setIsAuthenticated(false);
            console.log('Sign out successful');
        } catch(error) {
            console.error('Error signing out: ', error);
        }
    };

    const createEvent = () => {
        const request = {
            headline: "bla",
            description: "blabla",
            startDate: new Date().toLocaleDateString(),
            endDate: new Date().toLocaleDateString(),
            imageUrl: 'blabla.com',
            city: 'London'
        } as CreateEventRequest;
        setCreateEventRequest(request);
    };

    return (
        <>
            <Button
                onClick={createEvent}
                disabled={isLoadingEventCreation}
                // startIcon={<AddIcon />}
            >
                New Event
            </Button>
            <Button onClick={handleLogout}>Log Out</Button>
            <EventsDisplay events={events} isLoading={isLoadingEvents} />
            <Container maxWidth="sm">
                {
                    eventsFetchError && <Alert severity="error">
                        An error has occurred when getting events.
                    </Alert>
                }
                {
                    eventCreationError && <Alert severity="error">
                        An error has occured when creating a new event.
                    </Alert>
                }
            </Container>
        </>
    );
};

export default AuthEventManager;
