import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../components/App';
import { Auth } from 'aws-amplify';

describe('App Component', () => {

    beforeEach(() => {
        // eslint-disable-next-line no-throw-literal
        Auth.currentSession = jest.fn().mockImplementation(() => { throw 'No current user'; });
    });

    it('renders the App component for an unauthenticated user', () => {
        render(<App />);
        const welcomeMessage: HTMLElement = screen.getByText(/welcome/i);
        const logInButton: HTMLElement = screen.getByText(/log in/i);
        expect(welcomeMessage).toBeInTheDocument();
        expect(logInButton).toBeInTheDocument();
    });

    it('renders the App component for an authenticated user', async () => {
        Auth.currentSession = jest.fn().mockImplementation();
        render(<App />);
        const newEventButton: HTMLElement = await screen.findByText(/new event/i);
        expect(newEventButton).toBeInTheDocument();
        const logOutButton: HTMLElement = screen.getByText(/log out/i);
        expect(logOutButton).toBeInTheDocument();
    });
});