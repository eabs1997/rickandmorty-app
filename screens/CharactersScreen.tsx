import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { FlatList } from 'react-native';
import { getAllCharacters } from '../services/CharactersService';
import { Card } from '../components/Card';
import { CharactersScreenProps, DrawerProps } from '../types/navigation';

const CharactersScreen = ({ navigation }: DrawerProps & CharactersScreenProps) => {
	// Access the client
	const queryClient = useQueryClient();

	// Queries
	const { data } = useQuery({
		queryKey: ['characters'],
		queryFn: async () => await getAllCharacters(),
	});
	// Mutations
	// const mutation = useMutation({
	// 	mutationFn: postTodo,
	// 	onSuccess: () => {
	// 		// Invalidate and refetch
	// 		queryClient.invalidateQueries({ queryKey: ['todos'] });
	// 	},
	// });
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
			keyExtractor={(item) => item.id}
		/>
	);
};

export default CharactersScreen;
