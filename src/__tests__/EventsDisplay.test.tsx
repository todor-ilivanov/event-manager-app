import { render, screen, within } from '@testing-library/react';
import EventsDisplay from '../components/EventsDisplay';
import MockDate from 'mockdate';
import { stringToDate } from '../utils/dateUtils';
import userEvent from '@testing-library/user-event';
import { mockEvents } from '../testutils/mockEvents';

describe('EventsDisplay', () => {

    const expectedHeadlineAndStatus = [
        ['Test event 2', 'Ongoing'],
        ['Test event 3', 'Upcoming'],
        ['Test event 1', 'Past']
    ];

    beforeEach(() => {
        const mockCurrentDate: Date = stringToDate('04/07/2021');
        MockDate.set(mockCurrentDate);
    });

    it('renders a list of events', () => {
        render(<EventsDisplay events={mockEvents} />);
        const eventCards: HTMLElement[] = screen.getAllByTestId('event-card');

        eventCards.forEach((eventCard: HTMLElement, index: number) => {
            expect(within(eventCard).getByText(expectedHeadlineAndStatus[index][0])).toBeInTheDocument();
            expect(within(eventCard).getByText(expectedHeadlineAndStatus[index][1])).toBeInTheDocument();
        });
    });

    it('renders the dialog box with event details when the button is clicked', async () => {
        render(<EventsDisplay events={mockEvents} />);
        const eventCard: HTMLElement = screen.getAllByTestId('event-card')[0];
        const mockEvent = mockEvents[1];

        const seeDetailsButton: HTMLElement = within(eventCard).getByText(/see details/i);
        userEvent.click(seeDetailsButton);

        const detailsDialog: HTMLElement = await screen.findByRole('dialog');
        expect(detailsDialog).toBeInTheDocument();
        expect(within(detailsDialog).getByText(mockEvent.headline)).toBeInTheDocument();
        expect(within(detailsDialog).getByText(mockEvent.description)).toBeInTheDocument();
        expect(within(detailsDialog).getByText(`${mockEvent.startDate} - ${mockEvent.endDate}`)).toBeInTheDocument();
        expect(within(detailsDialog).getByText(mockEvent.city)).toBeInTheDocument();
    });

    it('renders no events and informative message that the user has none yet', () => {
        render(<EventsDisplay events={[]} />);
        const message: HTMLElement = screen.getByText('You have no events yet, feel free to create some!');
        expect(message).toBeInTheDocument();
    });
});