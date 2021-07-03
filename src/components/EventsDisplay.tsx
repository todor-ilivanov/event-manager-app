import React from 'react';
import { Grid } from '@material-ui/core';
import { EventDTO } from '../models/Event';
import EventCard from './EventCard';
import { useEventsGridStyles } from '../hooks/MaterialUIStylesHooks';

type EventsDisplayProps = {
    isLoading: boolean;
    events: EventDTO[];
};

const EventsDisplay = (props: EventsDisplayProps) => {

    const { events, isLoading } = props;
    const classes = useEventsGridStyles();

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {events.map((event) => (
                        <Grid key={event.eventId} item>
                            <EventCard event={event} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EventsDisplay;