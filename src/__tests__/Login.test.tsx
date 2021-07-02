
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Auth } from 'aws-amplify';
import Login from '../Login';

fit('sends a successful login request', async () => {
    render(<Login />);
    const logInButton: HTMLElement = screen.getByText(/log in/i);
    userEvent.click(logInButton);
    await screen.findByRole('dialog');
    const emailInput: HTMLElement = await screen.getByTestId('login-email-input');
    const passwordInput: HTMLElement = screen.getByTestId('login-password-input');

    userEvent.type(emailInput, 'testEmail@abc.com');
    userEvent.type(passwordInput, 'stronKpass');
    expect(emailInput).toHaveValue('testEmail@abc.com');
    expect(passwordInput).toHaveValue('stronKpass');

    Auth.signIn = jest.fn().mockImplementation();
    const logInWithDetails: HTMLElement = screen.getByTestId('login-dialog-button');
    userEvent.click(logInWithDetails);

    // const helloUser: HTMLElement = await screen.findByText(/hello user/i);
    // expect(helloUser).toBeInTheDocument();
});