import React, { useState } from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { EventDTO } from '../models/Event';
import EventCard from './EventCard';
import { useEventsGridStyles } from '../hooks/MaterialUIStylesHooks';
import SelectedEventDialog from './SelectedEventDialog';

type EventsDisplayProps = {
    isLoading: boolean;
    events: EventDTO[];
};

const EventsDisplay = (props: EventsDisplayProps) => {

    const { events, isLoading } = props;
    const classes = useEventsGridStyles();
    const [selectedEvent, setSelectedEvent] = useState<EventDTO | undefined>(undefined);

    const [openDetailsDialog, setOpenDetailsDialog] = useState<boolean>(false);

    const handleDialogClose = () => {
        setOpenDetailsDialog(false);
    };

    const renderEvents = (events: EventDTO[]) => {
        if(events.length === 0) {
            return <Typography variant="h5" component="h2">
                You have no events yet, feel free to create some!
            </Typography>
        } else {
            return events.map((event) => (
                <Grid key={event.eventId} item>
                    <EventCard
                        event={event}
                        setSelectedEvent={setSelectedEvent}
                        setOpenDetailsDialog={setOpenDetailsDialog}
                    />
                </Grid>)
            )
        }
    }

    return (<>
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {
                        !isLoading ? renderEvents(events) : <CircularProgress size={70} />
                    }
                </Grid>
            </Grid>
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