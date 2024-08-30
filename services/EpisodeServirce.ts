export const getEpisodes = async (episodes: string[]) => {
	const ids = episodes.map((episode) => episode.split('episode/')[1]);
	console.log(ids, 121);
	const data = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}episode/${ids}`);
	return data.json();
};
