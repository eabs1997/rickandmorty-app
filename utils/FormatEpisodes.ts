import { EpisodeInterface } from '../shared/interfaces/episode';

export const formatEpisodes = (
	episodes: EpisodeInterface[]
): { title: string; data: EpisodeInterface[] }[] => {
	const seasons = episodes.map((item) => item.episode.split('E')[0]);
	const data = [...new Set(seasons)].map((season) => ({
		title: season,
		data: episodes.filter((item) => item.episode.split('E')[0] === season),
	}));
	return data;
};
