import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { Auth } from 'aws-amplify';

beforeEach(() => {
    // eslint-disable-next-line no-throw-literal
    Auth.currentSession = jest.fn().mockImplementation(() => { throw 'No current user'; });
});

xit('renders the App component for an unauthenticated user', () => {
    render(<App />);
    const welcomeMessage: HTMLElement = screen.getByText(/welcome/i);
    const logInButton: HTMLElement = screen.getByText(/log in/i);
    expect(welcomeMessage).toBeInTheDocument();
    expect(logInButton).toBeInTheDocument();
});

xit('renders the login dialog form in a dialog when the button is clicked', async () => {
    render(<App />);
    const logInButton: HTMLElement = screen.getByText(/log in/i);
    userEvent.click(logInButton);
    const dialog: HTMLElement = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    const emailInput: HTMLElement = screen.getByLabelText(/e-mail/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput: HTMLElement = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    const logInWithDetails: HTMLElement = screen.getByTestId('login-dialog-button');
    expect(logInWithDetails).toBeInTheDocument();

    const cancelButton: HTMLElement = screen.getByText(/cancel/i);
    expect(cancelButton).toBeInTheDocument();
});

it('renders the App component for an authenticated user', async () => {
    Auth.currentSession = jest.fn().mockImplementation();
    render(<App />);
    const helloUser: HTMLElement = await screen.findByText(/hello user/i);
    expect(helloUser).toBeInTheDocument();
    const logOutButton: HTMLElement = screen.getByText(/log out/i);
    expect(logOutButton).toBeInTheDocument();
});