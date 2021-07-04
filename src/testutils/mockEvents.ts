import { EventDTO } from '../models/Event';

export const mockEvents = [
    {
        eventId: 'event-1',
        headline: 'Test event 1',
        description: 'Test event 1 descr',
        startDate: '02/07/2021',
        endDate: '02/07/2021',
        imageUrl: 'test1.com',
        city: 'Milan'
    },
    {
        eventId: 'event-2',
        headline: 'Test event 2',
        description: 'Test event 2 descr',
        startDate: '04/07/2021',
        endDate: '05/07/2021',
        imageUrl: 'test2.com',
        city: 'Lisbon'
    },
    {
        eventId: 'event-3',
        headline: 'Test event 3',
        description: 'Test event 3 descr',
        startDate: '07/07/2021',
        endDate: '07/07/2021',
        imageUrl: 'test3.com',
        city: 'Venice'
    }
] as EventDTO[];