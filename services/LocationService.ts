import { LocationInterface } from '../shared/interfaces/locations';
import { PaginationInterface } from '../shared/interfaces/pagination';

interface ResultLocationsInterface {
	info: PaginationInterface;
	results: LocationInterface[];
}

export const getAllLocations = async (page = 1): Promise<ResultLocationsInterface> => {
	const data = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}location?page=${page}`);
	return data.json();
};

export const getFilterLocations = async (name: string): Promise<ResultLocationsInterface> => {
	const data = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}location/?name=${name}`);
	return data.json();
};

export const getLocation = async (id: number): Promise<LocationInterface> => {
	const data = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}location/${id}`);
	return data.json();
};
