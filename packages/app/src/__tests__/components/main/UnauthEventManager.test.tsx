import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UnauthEventManager from '../../../components/main/UnauthEventManager';

describe('UnauthEventManager', () => {

    it('renders the welcoming messages', async () => {
        render(<UnauthEventManager />);
        const welcomeMessage1: HTMLElement = screen.getByText(/welcome/i);
        expect(welcomeMessage1).toBeInTheDocument();
        const welcomeMessage2: HTMLElement = screen.getByText(/create and manage events/i);
        expect(welcomeMessage2).toBeInTheDocument();
    });

    it('renders the login dialog form in a dialog when the button is clicked', async () => {
        render(<UnauthEventManager />);
        const logInButton: HTMLElement = screen.getByText(/log in/i);
        userEvent.click(logInButton);
        const dialog: HTMLElement = await screen.findByRole('dialog');
        expect(dialog).toBeInTheDocument();

        const emailInput: HTMLElement = screen.getByTestId('login-email-input');
        expect(emailInput).toBeInTheDocument();

        const passwordInput: HTMLElement = screen.getByTestId('login-password-input');
        expect(passwordInput).toBeInTheDocument();

        const logInWithDetails: HTMLElement = screen.getByTestId('login-dialog-button');
        expect(logInWithDetails).toBeInTheDocument();

        const cancelButton: HTMLElement = screen.getByText(/cancel/i);
        expect(cancelButton).toBeInTheDocument();
    });
});