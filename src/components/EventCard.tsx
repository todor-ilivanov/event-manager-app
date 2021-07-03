import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { EventDTO } from '../models/Event';
import { stringToDate } from '../utils/dateUtils';
import { useEventCardStyles } from '../hooks/MaterialUIStylesHooks';

type EventCardProps = {
    event: EventDTO
}

const EventCard = (props: EventCardProps) => {
    const { event } = props;
    const classes = useEventCardStyles();

    return (
        <Card className={classes.root}>
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