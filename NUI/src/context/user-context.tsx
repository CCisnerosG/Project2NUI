import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    mail: string,
    pass: string
}


type UserContext = User[] | null;

const UserContext = createContext<UserContext>(null);

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<UserContext>(null);

    useEffect(() => {
        axios.get<UserContext[]>('/data/users.json')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
            });
    }, []);

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    );
};
