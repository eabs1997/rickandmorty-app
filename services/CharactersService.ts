export const getAllCharacters = async (page = 1) => {
	console.log(process.env.EXPO_PUBLIC_BASE_URL);
	const data = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}character?page=${page}`);
	return data.json();
};

export const getCharacter = async (id: number) => {
	console.log(process.env.EXPO_PUBLIC_BASE_URL);
	const data = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}character/${id}`);
	return data.json();
};
