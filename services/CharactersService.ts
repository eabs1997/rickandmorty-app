import { CharacterInterface } from '../shared/interfaces/character';
interface ResultCharactersInterface {
	info: {
		count: number;
		pages: number;
		next?: string;
		prev?: string;
	};
	results: CharacterInterface[];
}

export const getAllCharacters = async (page = 1): Promise<ResultCharactersInterface> => {
	const data = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}character?page=${page}`);
	return data.json();
};

export const getCharacter = async (id: number): Promise<CharacterInterface> => {
	const data = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}character/${id}`);
	return data.json();
};
