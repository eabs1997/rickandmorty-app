export interface LocationInterface {
	// int	The id of the location.
	id: number;
	// string	The name of the location.
	name: string;
	// string	The type of the location.
	type: string;
	// string	The dimension in which the location is located.
	dimension: string;
	// List of character who have been last seen in the location.
	residents: string[];
	// Link to the location's own endpoint.
	url: string;
	// Time at which the location was created in the database.
	created: string;
}
