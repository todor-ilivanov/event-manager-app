import { render, screen, within } from '@testing-library/react';
import MockDate from 'mockdate';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { API } from 'aws-amplify';
import EventsDisplay from '../../../components/events/EventsDisplay';
import { EventDTO } from '../../../models/Event';
import { mockEvents } from '../../../testutils/mockEvents';
import { stringToDate } from '../../../utils/dateUtils';

describe('EventsDisplay', () => {

    const expectedHeadlineAndStatus = [
        ['Test event 2', 'Ongoing'],
        ['Test event 3', 'Upcoming'],
        ['Test event 1', 'Past']
    ];

    beforeEach(() => {
        const mockCurrentDate: Date = stringToDate('04/07/2021');
        MockDate.set(mockCurrentDate);
        API.get = jest.fn().mockImplementation();
    });

    const renderEventsDisplay = (events: EventDTO[]) => {
        render(
            <QueryClientProvider client={new QueryClient()}>
                <EventsDisplay events={events} />
            </QueryClientProvider>
        );
    };

    const selectEventHelper = async (index: number): Promise<HTMLElement> => {
        const eventCard: HTMLElement = screen.getAllByTestId('event-card')[index];
        const seeDetailsButton: HTMLElement = within(eventCard).getByText(/see details/i);
        userEvent.click(seeDetailsButton);
        return screen.findByRole('dialog');
    };

    const checkTextWithinElement = (element: HTMLElement, textValue: string) => {
        expect(within(element).getByText(textValue)).toBeInTheDocument();
    };

    it('renders a list of events', () => {
        renderEventsDisplay(mockEvents);
        const eventCards: HTMLElement[] = screen.getAllByTestId('event-card');

        eventCards.forEach((eventCard: HTMLElement, index: number) => {
            checkTextWithinElement(eventCard, expectedHeadlineAndStatus[index][0]);
            checkTextWithinElement(eventCard, expectedHeadlineAndStatus[index][1]);
        });
    });

    it('renders the dialog box with event details when the button is clicked', async () => {
        renderEventsDisplay(mockEvents);
        const detailsDialog: HTMLElement = await selectEventHelper(0);
        const expectedEvent = {
            headline: 'Test event 2',
            description: 'Test event 2 descr',
            startDate: '04/07/2021',
            endDate: '05/07/2021',
            city: 'Lisbon'
        };

        expect(detailsDialog).toBeInTheDocument();
        checkTextWithinElement(detailsDialog, expectedEvent.headline);
        checkTextWithinElement(detailsDialog, expectedEvent.description);
        checkTextWithinElement(detailsDialog, `${expectedEvent.startDate} - ${expectedEvent.endDate}`);
        checkTextWithinElement(detailsDialog, expectedEvent.city);
    });

    it('renders an event\'s weather info', async () => {
        API.get = jest.fn().mockImplementation(() => {
            return { city: 'Plovdiv', degreesC: 30.1, description: 'Clear', icon: '01d' };
        });
        renderEventsDisplay(mockEvents);
        const detailsDialog: HTMLElement = await selectEventHelper(0);
        checkTextWithinElement(detailsDialog, 'Clear');
        checkTextWithinElement(detailsDialog, '30.1 °C');
    });

    it('renders an error when weather info is unable to be fetched', async () => {
        API.get = jest.fn().mockImplementation(() => {
            return { error: 'Weather API Error' };
        });
        renderEventsDisplay(mockEvents);
        const detailsDialog: HTMLElement = await selectEventHelper(0);
        checkTextWithinElement(detailsDialog, `Error getting weather data for Lisbon.`);
    });

    it('renders no events and informative message that the user has none yet', () => {
        renderEventsDisplay([]);
        const message: HTMLElement = screen.getByText('You have no events yet, feel free to create some!');
        expect(message).toBeInTheDocument();
    });
});