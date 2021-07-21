import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Auth } from 'aws-amplify';
import React from 'react';
import { AppContext } from '../../../hooks/AppContext';
import SignupForm from '../../../components/authentication/SignupForm';

const signUpHelper = async (email: string, pass: string, confirmPass: string) => {
    const emailInput = screen.getByTestId('signup-email-input');
    const passwordInput = screen.getByTestId('signup-password-input');
    const confirmPasswordInput = screen.getByTestId('signup-confirm-password-input');
    const signUpButton = await screen.findByTestId('signup-dialog-button');
    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, pass);
    userEvent.type(confirmPasswordInput, confirmPass);
    userEvent.click(signUpButton);
};

describe('SignupForm', () => {

    beforeEach(() => {
        render(
            <AppContext.Provider value={{ isAuthenticated: false, setIsAuthenticated: () => { } }}>
                <SignupForm signupDialogOpen={true} handleDialogClose={() => { }} />
            </AppContext.Provider>
        );
    });

    it('user signs up successfully', async () => {
        const mockSignUpFn = jest.fn().mockImplementation(
            () => Promise.resolve({ email: 'someTestEmail@test.com' })
        );
        Auth.signUp = mockSignUpFn;
        const mockConfirmFn = jest.fn().mockImplementation();
        Auth.confirmSignUp = mockConfirmFn;
        const mockSignInFn = jest.fn().mockImplementation();
        Auth.signIn = mockSignInFn;

        await signUpHelper('someTestEmail@test.com', 'securePass123!', 'securePass123!');
        expect(mockSignUpFn).toHaveBeenCalled();
        const verifyCodeInput = await screen.findByTestId('signup-verification-input');
        expect(verifyCodeInput).toBeInTheDocument();
        const verifyButton = screen.getByTestId('verify-dialog-button');
        userEvent.type(verifyCodeInput, '123456');
        userEvent.click(verifyButton);

        expect(mockConfirmFn).toHaveBeenCalled();
    });

    it('sign up fails and displays error message- passwords don\'t match', async () => {
        await signUpHelper('someTestEmail@test.com', 'securePass123!', 'securePass1!');
        const error = await screen.findByText(/must match/i);
        expect(error).toBeInTheDocument();
    });

    it('sign up fails and displays error message - cognito API error', async () => {
        const mockSignUpFn = jest.fn().mockImplementation(
            () => Promise.reject({ message: 'cognito API error' })
        );
        Auth.signUp = mockSignUpFn;
        await signUpHelper('someTestEmail@test.com', 'securePass123!', 'securePass123!');
        const error = await screen.findByText(/cognito API error/i);
        expect(error).toBeInTheDocument();
    });

    it('resends verification code when account already exists', async () => {
        const mockSignUpFn = jest.fn().mockImplementation(
            () => Promise.reject({ code: 'UsernameExistsException' })
        );
        const mockResendSignUpFn = jest.fn().mockImplementation();
        Auth.signUp = mockSignUpFn;
        Auth.resendSignUp = mockResendSignUpFn;
        await signUpHelper('someTestEmail@test.com', 'securePass123!', 'securePass123!');
        expect(mockResendSignUpFn).toHaveBeenCalled();
    });
});
