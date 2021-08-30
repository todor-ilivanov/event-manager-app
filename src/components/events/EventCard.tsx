import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { EventDTO, getEventStatus } from '../../models/Event';
import { useEventCardStyles } from '../../hooks/MaterialUIStylesHooks';

type EventCardProps = {
    event: EventDTO;
    setSelectedEvent: (event: EventDTO) => void;
    setOpenDetailsDialog: (open: boolean) => void;
}

const EventCard = (props: EventCardProps) => {
    const { event, setSelectedEvent, setOpenDetailsDialog } = props;
    const classes = useEventCardStyles();

    return (
        <Card className={classes.root} data-testid="event-card">
            <CardContent>
                <Typography variant="h5" component="h2">
                    {event.headline}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {getEventStatus(event)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small"
                    onClick={
                        () => {
                            setSelectedEvent(event);
                            setOpenDetailsDialog(true);
                        }
                    }
                >
                    See Details
                </Button>
            </CardActions>
        </Card>
    );
}
  
export default EventCard;