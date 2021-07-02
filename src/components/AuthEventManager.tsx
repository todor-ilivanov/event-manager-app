import React from 'react';
import { Button } from '@material-ui/core';
import { useAppContext } from '../AppContext';
import { Auth } from 'aws-amplify';

const AuthEventManager = () => {
    const { setIsAuthenticated } = useAppContext();

    const handleLogout = async () => {
        try {
            await Auth.signOut();
            setIsAuthenticated(false);
            console.log('Sign out successful');
        } catch(error) {
            console.error('Error signing out: ', error);
        }
    };

    return (
        <>
            <div>Hello User</div>
            <Button onClick={handleLogout}>Log Out</Button>
        </>
    );
};

export default AuthEventManager;
