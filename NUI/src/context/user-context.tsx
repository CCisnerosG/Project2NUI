import React, { ReactNode, createContext, useContext, useEffect } from 'react';

import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface User {
    mail: string,
    pass: string
}

type UserContext = User[] | null;

const UserContext = createContext<UserContext>(null);

export const useUserContext = () => useContext(UserContext);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [data, setData] = useLocalStorage<UserContext>('userData', null);

    useEffect(() => {
        if (!data) {
            axios.get<UserContext[]>('/data/users.json')
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching the data:', error);
                });
        }
    }, [data, setData]);

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    );
};
