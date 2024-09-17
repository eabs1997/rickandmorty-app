import { useQuery } from '@tanstack/react-query';
import { getCharacter } from '../../services/CharacterService';
import { getEpisodes } from '../../services/EpisodeService';
import { formatEpisodes } from '../../utils/FormatEpisodes';
import { RouteProp } from '@react-navigation/native';
import { CharactersStackParamList } from '../../shared/types/navigation';
import { mockCharacter } from '../../shared/mocks/mockCharacter';

export const useCharacterQuery = (
	route: RouteProp<CharactersStackParamList, 'CharacterDetail'>
) => {
	// Queries
	const res = useQuery({
		queryKey: ['character', route.params.id],
		queryFn: async () => await getCharacter(route.params.id),
	});

	// Then get the user's projects
	const { data: episodes, isLoading } = useQuery({
		queryKey: ['episodes', res.data?.episode],
		queryFn: async () => {
			const resp = await getEpisodes(res.data?.episode!);
			const dataToFormat = Array.isArray(resp) ? resp : [resp];
			return formatEpisodes(dataToFormat);
		},
		// The query will not execute until the userId exists
		enabled: !!res.data?.episode,
	});

	return { ...res, isLoading, episodes, data: isLoading ? mockCharacter : res.data };
};
