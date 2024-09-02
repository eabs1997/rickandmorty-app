import { useQueryClient, useQuery } from '@tanstack/react-query';
import { FlatList } from 'react-native';
import { getAllCharacters } from '../services/CharactersService';
import { Card } from '../components/Card';
import { DrawerProps } from '../shared/types/navigation';

const CharactersScreen = ({ navigation }: DrawerProps) => {
	// Access the client
	const queryClient = useQueryClient();

	// Queries
	const { data } = useQuery({
		queryKey: ['characters'],
		queryFn: async () => await getAllCharacters(),
	});

	return (
		<FlatList
			data={data?.results}
			renderItem={({ item }) => {
				return (
					<Card
						item={item}
						onPress={() => {
							navigation.navigate('Detail', { id: item.id });
						}}
					/>
				);
			}}
			keyExtractor={(item) => `${item.id}`}
		/>
	);
};

export default CharactersScreen;
