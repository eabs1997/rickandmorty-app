export interface EpisodeInterface {
	// int	The id of the episode.
	id: number;
	// string	The name of the episode.
	name: string;
	// string	The air date of the episode.
	air_date: string;
	// string	The code of the episode.
	episode: string;
	// array (urls)	List of characters who have been seen in the episode.
	characters: string[];
	// Link to the episode's own endpoint.
	url: string;
	// Time at which the episode was created in the database.
	created: string;
}
