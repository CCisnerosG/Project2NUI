import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Country {
    id: number;
    name: string;
    states: string[];
}


type CountriesContext = Country[] | null;

const CountriesContext = createContext<CountriesContext>(null);

export const useCountriesContext = () => useContext(CountriesContext) ?? [];

interface CountriesProviderProps {
    children: ReactNode;
  }

export const CountriesProvider: React.FC<CountriesProviderProps> = ({ children }) => {
    const [data, setData] = useState<CountriesContext>(null);

    useEffect(() => {
        axios.get<Country[]>('/data/countries.json')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching the data:', error);
            });
    }, []);

    return (
        <CountriesContext.Provider value={data}>
            {children}
        </CountriesContext.Provider>
    );
};
