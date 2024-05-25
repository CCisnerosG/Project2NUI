import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  type: string;
  weight: number;
  height: number;
  price: number;
  subtotal: number;
  taxes: number;
  save: number;
  description: string;
  generation: number;
  cries: string;
  legendary: boolean;
  icon_sprite: string;
}


type PokemonContextType = Pokemon[] | null;

const PokemonContext = createContext<PokemonContextType>(null);

export const usePokemonContext = () => useContext(PokemonContext);

interface PokemonProviderProps {
  children: ReactNode;
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [data, setData] = useState<PokemonContextType>(null);



  useEffect(() => {
    axios.get<Pokemon[]>('http://localhost:8080/api/v1/pokemon')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching the data:', error);
      });
  }, []);

  return (
    <PokemonContext.Provider value={data}>
      {children}
    </PokemonContext.Provider>
  );
};
