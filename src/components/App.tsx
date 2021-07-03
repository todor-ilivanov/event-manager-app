import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppContext } from '../AppContext';
import AuthEventManager from './AuthEventManager';
import UnauthEventManager from './UnauthEventManager';

const queryClient = new QueryClient();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        getAuthenticatedUser();
    }, []);

    const getAuthenticatedUser = async () => {
        try {
            await Auth.currentSession();
            setIsAuthenticated(true);
        } catch(error) {
            if(error !== 'No current user') {
                console.error(error);
            }
        }
    };

    return (
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <QueryClientProvider client={queryClient}>
                {
                    isAuthenticated ? <AuthEventManager /> : <UnauthEventManager />
                }
            </QueryClientProvider>
        </AppContext.Provider>
    );
};

export default App;
