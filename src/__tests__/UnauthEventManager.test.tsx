import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UnauthEventManager from '../components/UnauthEventManager';

describe('UnauthEventManager', () => {

    it('renders the login dialog form in a dialog when the button is clicked', async () => {
        render(<UnauthEventManager />);
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
});