import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthEventManager from '../components/AuthEventManager';
import { Auth, API } from 'aws-amplify';
import { AppContext } from '../AppContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { mockEvents } from '../testutils/mockEvents';

describe('AuthEventManager', () => {

    beforeEach(() => {
        API.get = jest.fn().mockImplementation(() => mockEvents);
        render(
            <AppContext.Provider value={{ isAuthenticated: true, setIsAuthenticated: () => { } }}>
                <QueryClientProvider client={new QueryClient()}>
                    <AuthEventManager />
                </QueryClientProvider>
            </AppContext.Provider>
        );
    });

    it('calls the API to fetch events when rendered', async () => {
        const eventHeadline = await screen.findByText('Test event 1');
        expect(eventHeadline).toBeInTheDocument();
        expect(API.get).toBeCalled();
    });

    it('signs out the user when the Log Out button is clicked', () => {
        const mockSignOutFn = jest.fn().mockImplementation();
        Auth.signOut = mockSignOutFn;

        const logOutButton: HTMLElement = screen.getByText(/log out/i);
        userEvent.click(logOutButton);
        expect(mockSignOutFn).toBeCalled();
    });
});