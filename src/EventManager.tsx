import React from 'react';
import { Button } from '@material-ui/core';
import { useAppContext } from './AppContext';
import { Auth } from 'aws-amplify';

const EventManager = () => {
    const { setIsAuthenticated } = useAppContext();

    const handleLogout = async () => {
        try {
            await Auth.signOut();
            setIsAuthenticated(false);
            console.log('Sign out successful');
        } catch(error) {
            console.error('error signing out: ', error);
        }
    };

    return (
        <>
            <div>Hello User</div>
            <Button onClick={handleLogout}>Log Out</Button>
        </>
    );
};

export default EventManager;
