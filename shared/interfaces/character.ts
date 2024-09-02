export interface CharacterInterface {
	// int	The id of the character.
	id: number;
	// string	The name of the character.
	name: string;
	// string	The status of the character ('Alive', 'Dead' or 'unknown').
	status: string;
	// string	The species of the character.
	species: string;
	// string	The type or subspecies of the character.
	type: string;
	// string	The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
	gender: string;
	// object	Name and link to the character's origin location.
	origin: { name: string; url: string };
	// object	Name and link to the character's last known location endpoint.
	location: { name: string; url: string };
	// string (url)	Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
	image: string;
	// array (urls)	List of episodes in which this character appeared.
	episode: string[];
	// string (url)	Link to the character's own URL endpoint.
	url: string;
	// string	Time at which the character was created in the database.
	created: string;
}
