import { EpisodeInterface } from '../shared/interfaces/episode';

export const getEpisodes = async (
	episodes: string[]
): Promise<EpisodeInterface[] | EpisodeInterface> => {
	const ids = episodes.map((episode) => episode.split('episode/')[1]);
	const data = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}episode/${ids}`);
	return data.json();
};
