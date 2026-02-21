import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { EventDTO, EventStatus, getEventStatus } from '../../models/Event';
import EventCard from './EventCard';
import { useEventsGridStyles } from '../../hooks/MaterialUIStylesHooks';
import SelectedEventDialog from './SelectedEventDialog';
import '../../styles/eventsDisplay.css';

type EventsDisplayProps = {
    events: EventDTO[];
};

const EventsDisplay = (props: EventsDisplayProps) => {

    const { events } = props;
    const classes = useEventsGridStyles();
    const [selectedEvent, setSelectedEvent] = useState<EventDTO | undefined>(undefined);

    const [openDetailsDialog, setOpenDetailsDialog] = useState<boolean>(false);

    const handleDialogClose = () => {
        setOpenDetailsDialog(false);
    };

    const renderEvents = (events: EventDTO[], status: EventStatus) => {
        return events
            .filter(event => getEventStatus(event) === status)
            .map((event) => (
                <Grid key={event.eventId} item>
                    <EventCard
                        event={event}
                        setSelectedEvent={setSelectedEvent}
                        setOpenDetailsDialog={setOpenDetailsDialog}
                    />
                </Grid>
            )
        );
    };

    return (<>
        <Grid container className={classes.root} spacing={2} id="events-grid">
            {
                events.length === 0 ? <Typography variant="h5" component="h2">
                    You have no events yet, feel free to create some!
                </Typography> :
                    <Grid item xs={12}>
                        <Grid item className="event-status">
                            <Typography variant="h5" component="h2">Ongoing</Typography>
                        </Grid>
                        <Grid container className="events-group" justify="flex-start" spacing={2}>
                            {
                                renderEvents(events, 'Ongoing')
                            }
                        </Grid>
                        <Grid item className="event-status">
                            <Typography variant="h5" component="h2">Upcoming</Typography>
                        </Grid>
                        <Grid container className="events-group" justify="flex-start" spacing={2}>
                            {
                                renderEvents(events, 'Upcoming')
                            }
                        </Grid>
                        <Grid item className="event-status">
                            <Typography variant="h5" component="h2">Past</Typography>
                        </Grid>
                        <Grid container className="events-group" justify="flex-start" spacing={2}>
                            {
                                renderEvents(events, 'Past')
                            }
                        </Grid>
                    </Grid>
            }
        </Grid>
        <SelectedEventDialog
            open={openDetailsDialog}
            selectedEvent={selectedEvent}
            handleClose={handleDialogClose}
            setSelectedEvent={setSelectedEvent}
        />
    </>);
};

export default EventsDisplay;