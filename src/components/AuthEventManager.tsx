import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { useAppContext } from '../AppContext';
import { Auth } from 'aws-amplify';
import { useCreateNewEvent, useEvents } from '../hooks/EventsApiHooks';
import { EventDTO } from '../models/Event';
import { CreateEventRequest } from '../models/ApiRequests';
import EventsDisplay from './EventsDisplay';

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
            <EventsDisplay events={events} isLoading={isLoadingEvents} />
            {
                eventsFetchError && <div>Error</div>
            }
            {
                eventCreationError && <div>Error</div>
            }
            <Button onClick={createEvent} disabled={isLoadingEventCreation}>Create new event</Button>
            <Button onClick={handleLogout}>Log Out</Button>
        </>
    );
};

export default AuthEventManager;
