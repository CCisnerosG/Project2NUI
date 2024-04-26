import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface Pokemon {
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
  evolution_chain: string;
  isLegendary: boolean;
}


type PokemonContextType = Pokemon[] | null;

const PokemonContext = createContext<PokemonContextType>(null);

export const usePokemonContext = () => useContext(PokemonContext);

export const PokemonProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<PokemonContextType>(null);

  useEffect(() => {
    axios.get<Pokemon[]>('/data/pokemon.json')
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
