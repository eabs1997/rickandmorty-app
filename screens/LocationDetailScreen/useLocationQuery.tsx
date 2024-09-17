import { useQuery } from '@tanstack/react-query';
import { getCharacters } from '../../services/CharacterService';
import { RouteProp } from '@react-navigation/native';
import { LocationsStackParamList } from '../../shared/types/navigation';
import { getLocation } from '../../services/LocationService';

export const useLocationQuery = (route: RouteProp<LocationsStackParamList, 'LocationDetail'>) => {
	// Queries
	const res = useQuery({
		queryKey: ['location', route.params.id],
		queryFn: async () => await getLocation(route.params.id),
	});

	// Then get the user's projects
	const { data: characters, isLoading } = useQuery({
		queryKey: ['charactersByLocation', res.data?.residents],
		queryFn: async () => {
			const resp = await getCharacters(res.data?.residents!);
			const dataToFormat = Array.isArray(resp) ? resp : [resp];
			return dataToFormat;
		},
		// The query will not execute until the userId exists
		enabled: !!res.data?.residents,
	});
	return { ...res, isLoading, characters };
};
