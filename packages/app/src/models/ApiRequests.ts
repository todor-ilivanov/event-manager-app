import { localizedDateToString } from '../utils/dateUtils';

export type CreateEventRequest = {
    headline: string;
    description: string;
    startDate: string;
    endDate: string;
    imageUrl: string;
    city: string;
};

export type NewEvent = {
    headline: string;
    description: string;
    startDate: Date;
    endDate: Date;
    imageUrl: string;
    city: string;

    [key: string]: string | Date
};

export const getBlankEvent = (): NewEvent => {
    return {
        headline: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        imageUrl: '',
        city: ''
    } as NewEvent;
};

export const buildCreateEventRequest = (event: NewEvent): CreateEventRequest => {
    return {
        headline: event.headline,
        description: event.description,
        startDate: localizedDateToString(event.startDate),
        endDate: localizedDateToString(event.endDate),
        imageUrl: event.imageUrl,
        city: event.city
    } as CreateEventRequest;
}