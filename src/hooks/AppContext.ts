import { createContext, useContext } from 'react';

type LoginContext = {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext({} as LoginContext);

export const useAppContext = () => {
    return useContext(AppContext);
};