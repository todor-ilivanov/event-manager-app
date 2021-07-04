import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { EventDTO } from '../models/Event';
import { stringToDate } from '../utils/dateUtils';
import { useEventCardStyles } from '../hooks/MaterialUIStylesHooks';

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
                    {getEventStatus(event.startDate, event.endDate)}
                </Typography>
                <Typography variant="body2" component="p">
                    {event.description}
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

const getEventStatus = (start: string, end: string): string | undefined => {
    const currentDate = new Date();
    try {
        const startDate = stringToDate(start);
        const endDate = stringToDate(end);
        if(currentDate >= startDate && currentDate <= endDate) {
            return 'Ongoing';
        } else if(currentDate > endDate) {
            return 'Past';
        } else {
            return 'Upcoming';
        }
    } catch(error) {
        console.error(error);
        return undefined;
    }
}

    
export default EventCard;