import { createContext, useContext } from 'react';

export type CharactersContent = {
	characters: number[];
	setCharacters: (ids: number[]) => void;
};
export const CharactersContext = createContext<CharactersContent>({
	characters: [], // set a default value
	setCharacters: () => {},
});

export const useCharactersContext = () => useContext(CharactersContext);
