import { render, screen, within } from '@testing-library/react';
import EventsDisplay from '../components/EventsDisplay';
import MockDate from 'mockdate';
import { EventDTO } from '../models/Event';
import { stringToDate } from '../utils/dateUtils';
import userEvent from '@testing-library/user-event';

describe('EventsDisplay', () => {

    const mockEvents = [
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

    const expectedHeadlineAndStatus = [
        ['Test event 1', 'Past'],
        ['Test event 2', 'Ongoing'],
        ['Test event 3', 'Upcoming'],
    ];

    it('renders a list of events', () => {
        render(<EventsDisplay isLoading={false} events={mockEvents} />);
        const mockCurrentDate: Date = stringToDate('04/07/2021');
        MockDate.set(mockCurrentDate);
        const eventCards: HTMLElement[] = screen.getAllByTestId('event-card');

        eventCards.forEach((eventCard: HTMLElement, index: number) => {
            expect(within(eventCard).getByText(expectedHeadlineAndStatus[index][0])).toBeInTheDocument();
            expect(within(eventCard).getByText(expectedHeadlineAndStatus[index][1])).toBeInTheDocument();
        })
    });

    it('renders the dialog box with event details when the button is clicked', async () => {
        render(<EventsDisplay isLoading={false} events={mockEvents} />);
        const eventCard: HTMLElement = screen.getAllByTestId('event-card')[0];
        const mockEvent = mockEvents[0];

        const seeDetailsButton: HTMLElement = within(eventCard).getByText(/see details/i);
        userEvent.click(seeDetailsButton);

        const detailsDialog: HTMLElement = await screen.findByRole('dialog');
        expect(detailsDialog).toBeInTheDocument();
        expect(within(detailsDialog).getByText(mockEvent.headline)).toBeInTheDocument();
        expect(within(detailsDialog).getByText(mockEvent.description)).toBeInTheDocument();
        expect(within(detailsDialog).getByText(mockEvent.startDate)).toBeInTheDocument();
        expect(within(detailsDialog).getByText(mockEvent.city)).toBeInTheDocument();
    });

    it('renders no events and informative message that the user has none yet', () => {
        render(<EventsDisplay isLoading={false} events={[]} />);
        const message: HTMLElement = screen.getByText('You have no events yet, feel free to create some!');
        expect(message).toBeInTheDocument();
    });

    it('renders the progress element when loading', () => {
        render(<EventsDisplay isLoading={true} events={[]} />)
        const progressBar: HTMLElement = screen.getByRole('progressbar');
        expect(progressBar).toBeInTheDocument();
    });
});