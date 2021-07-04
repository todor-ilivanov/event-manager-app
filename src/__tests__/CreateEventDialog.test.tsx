import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import CreateEventDialog from '../components/CreateEventDialog';
import { stringToDate } from '../utils/dateUtils';
import MockDate from 'mockdate';
import { API } from 'aws-amplify';

describe('CreateEventDialog', () => {

    beforeEach(() => {
        const mockCurrentDate: Date = stringToDate('04/07/2021');
        MockDate.set(mockCurrentDate);
        render(
            <QueryClientProvider client={new QueryClient()}>
                <CreateEventDialog
                    open={true}
                    handleDialogClose={() => { }}
                    setShouldFetchEvents={() => { }}
                />
            </QueryClientProvider>
        );
    });

    const populateInputFields = () => {
        const headlineInputField = screen.getByTestId('headline-input');
        const descriptionInputField = screen.getByTestId('description-input');
        const cityInputField = screen.getByTestId('city-input');
        userEvent.type(headlineInputField, 'test event headline');
        userEvent.type(descriptionInputField, 'test event description');
        userEvent.type(cityInputField, 'test event city');
    }

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

    it('makes the API request with a correct event', () => {
        API.post = jest.fn().mockImplementation();

        populateInputFields();
        const createButton = screen.getByTestId('create-new-event-submit');
        userEvent.click(createButton);

        expect(API.post).toHaveBeenCalled();
    });

    it('displays input validation errors correctly', async () => {
        const startDatePicker = screen.getByTestId('start-date-picker') as HTMLInputElement;
        startDatePicker.setSelectionRange(0, startDatePicker.value.length);
        userEvent.type(startDatePicker, '07/07/2027');

        const createButton = await screen.findByTestId('create-new-event-submit');
        userEvent.click(createButton);

        const errors = await screen.findAllByText(/cannot be empty/i);
        const dateError = await screen.findByText(/must be later/i);
        expect(errors.length).toBe(3);
        expect(dateError).toBeInTheDocument();
    });
});