import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthEventManager from '../components/AuthEventManager';
import { Auth } from 'aws-amplify';
import { AppContext } from '../AppContext';

describe('AuthEventManager', () => {

    beforeEach(() => {
        render(
            <AppContext.Provider value={{ isAuthenticated: true, setIsAuthenticated: () => { } }}>
                <AuthEventManager />
            </AppContext.Provider>
        );
    });

    it('signs out the user when the Log Out button is clicked', async () => {

        const mockSignOutFn = jest.fn().mockImplementation();
        Auth.signOut = mockSignOutFn;

        const logOutButton: HTMLElement = screen.getByText(/log out/i);
        userEvent.click(logOutButton);
        expect(mockSignOutFn).toBeCalled();
    });
});