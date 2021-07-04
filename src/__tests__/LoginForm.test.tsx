import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Auth } from 'aws-amplify';
import LoginForm from '../components/LoginForm';
import { AppContext } from '../AppContext';

describe('LoginForm', () => {

    beforeEach(() => {
        render(
            <AppContext.Provider value={{ isAuthenticated: false, setIsAuthenticated: () => { } }}>
                <LoginForm loginDialogOpen={true} handleDialogClose={() => { }} />
            </AppContext.Provider>
        );
    });

    it('sends a successful login request', async () => {
        const emailInput: HTMLElement = screen.getByTestId('login-email-input');
        const passwordInput: HTMLElement = screen.getByTestId('login-password-input');

        userEvent.type(emailInput, 'testEmail@abc.com');
        userEvent.type(passwordInput, 'stronKpass');
        expect(emailInput).toHaveValue('testEmail@abc.com');
        expect(passwordInput).toHaveValue('stronKpass');

        const mockSignInFn = jest.fn().mockImplementation();
        Auth.signIn = mockSignInFn;

        const logInWithDetails: HTMLElement = screen.getByTestId('login-dialog-button');
        userEvent.click(logInWithDetails);
        expect(mockSignInFn).toBeCalled();
    });

    it('sends an invalid login request and renders an error message', async () => {
        const emailInput: HTMLElement = screen.getByTestId('login-email-input');
        const passwordInput: HTMLElement = screen.getByTestId('login-password-input');

        userEvent.type(emailInput, 'testEmail@abc.com');
        userEvent.type(passwordInput, 'stronKpass');

        Auth.signIn = jest.fn().mockImplementation(() => { throw new Error('Incorrect username or password.'); });
        const consoleSpy = jest.spyOn(global.console, 'error').mockImplementation();

        const logInWithDetails: HTMLElement = screen.getByTestId('login-dialog-button');
        userEvent.click(logInWithDetails);
        const errorMessage = await screen.findByText(/incorrect username or password/i);
        expect(consoleSpy).toBeCalled();
        expect(errorMessage).toBeInTheDocument();
        consoleSpy.mockRestore();
    });
});