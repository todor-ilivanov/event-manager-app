import { stringToDate } from '../utils/dateUtils';

export type EventDTO = {
    userId: string | undefined;
    eventId: string | undefined;
    headline: string;
    description: string;
    startDate: string;
    endDate: string;
    imageUrl: string;
    city: string;

    [key: string]: string | undefined
};

export type EventStatus = 'Upcoming' | 'Past' | 'Ongoing';

export const getEventStatus = (event: EventDTO): EventStatus | undefined => {
    const currentDate = new Date();
    try {
        const startDate = stringToDate(event.startDate);
        const endDate = stringToDate(event.endDate);
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