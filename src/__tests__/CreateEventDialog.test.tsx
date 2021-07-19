import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import CreateEventDialog from '../components/CreateEventDialog';
import { stringToDate } from '../utils/dateUtils';
import MockDate from 'mockdate';
import { API } from 'aws-amplify';

const populateInputFields = (headline: string, description: string, city: string) => {
    const headlineInputField = screen.getByTestId('headline-input');
    const descriptionInputField = screen.getByTestId('description-input');
    const cityInputField = screen.getByTestId('city-input');
    userEvent.type(headlineInputField, headline);
    userEvent.type(descriptionInputField, description);
    userEvent.type(cityInputField, city);
};

const clickCreateEventButton = () => {
    const createButton = screen.getByTestId('create-new-event-submit');
    userEvent.click(createButton);
}

describe('CreateEventDialog', () => {

    beforeEach(() => {
        const mockCurrentDate: Date = stringToDate('04/07/2021');
        MockDate.set(mockCurrentDate);
        render(
            <QueryClientProvider client={new QueryClient()}>
                <CreateEventDialog
                    open={true}
                    handleDialogClose={() => { }}
                />
            </QueryClientProvider>
        );
    });

    it('renders the form correctly with default dates', () => {
        const headlineInputField = screen.getByTestId('headline-input');
        const descriptionInputField = screen.getByTestId('description-input');
        const cityInputField = screen.getByTestId('city-input');
        const startDatePicker = screen.getByTestId('start-date-picker');
        const endDatePicker = screen.getByTestId('end-date-picker');
        expect(headlineInputField).toBeInTheDocument();
        expect(descriptionInputField).toBeInTheDocument();
        expect(cityInputField).toBeInTheDocument();
        expect(startDatePicker).toHaveValue('04/07/2021');
        expect(endDatePicker).toHaveValue('04/07/2021');
    });

    it('makes the API request with a correct event', async () => {
        API.post = jest.fn().mockImplementation();
        populateInputFields('test event headline', 'test event description', 'test event city');
        clickCreateEventButton();
        expect(API.post).toHaveBeenCalled();
    });

    it('displays input validation errors correctly', async () => {
        API.post = jest.fn().mockImplementation();
        const startDatePicker = screen.getByTestId('start-date-picker') as HTMLInputElement;
        startDatePicker.setSelectionRange(0, startDatePicker.value.length);
        userEvent.type(startDatePicker, '07/07/2027');
        clickCreateEventButton();
        const errors = await screen.findAllByText(/cannot be empty/i);
        const dateError = await screen.findByText(/must be later/i);
        expect(errors.length).toBe(3);
        expect(dateError).toBeInTheDocument();
    });

    it('validates input field length correctly', async () => {
        const headline = new Array(32).join('a');
        const description = new Array(282).join('a');
        const city = new Array(52).join('a');
        populateInputFields(headline, description, city);
        clickCreateEventButton();
        const errors = await screen.findAllByText(/cannot be more than/i);
        expect(errors.length).toBe(3);
    });
});