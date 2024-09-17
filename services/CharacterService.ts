import { CharacterInterface } from '../shared/interfaces/character';
import { PaginationInterface } from '../shared/interfaces/pagination';

export interface ResultCharactersInterface {
	info: PaginationInterface;
	results: CharacterInterface[];
}

export const getAllCharacters = async (page = 1): Promise<ResultCharactersInterface> => {
	const data = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}character?page=${page}`);
	return data.json();
};

export const getCharacters = async (
	residents: string[] | number[]
): Promise<CharacterInterface[] | CharacterInterface> => {
	const ids = residents.every((item) => typeof item === 'number')
		? residents
		: residents.map((resident) => resident.split('character/')[1]);
	const data = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}character/${ids}`);
	return data.json();
};

export const getFilterCharacters = async (name: string): Promise<ResultCharactersInterface> => {
	const data = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}character/?name=${name}`);
	return data.json();
};

export const getCharacter = async (id: number): Promise<CharacterInterface> => {
	const data = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}character/${id}`);
	return data.json();
};
