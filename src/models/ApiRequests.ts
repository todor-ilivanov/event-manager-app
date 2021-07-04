import { EventDTO } from './Event';

export type CreateEventRequest = {
    headline: string;
    description: string;
    startDate: string;
    endDate: string;
    imageUrl: string;
    city: string;
};

export const buildCreateEventRequest = (event: EventDTO): CreateEventRequest => {
    return {
        headline: event.headline,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        imageUrl: event.imageUrl,
        city: event.city
    } as CreateEventRequest;
}
