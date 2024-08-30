export const formatEpisodes = (episodes: any[]) => {
	const seasons = episodes.map((item) => item.episode.split('E')[0]);
	const data = [...new Set(seasons)].map((season) => ({
		title: season,
		data: episodes.filter((item) => item.episode.split('E')[0] === season),
	}));
	return data;
};
