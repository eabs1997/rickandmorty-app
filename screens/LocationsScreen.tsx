import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { FlatList, Text, View } from 'react-native';
import { getAllCharacters } from '../services/CharactersService';
import { Card } from '../components/Card';
import { CharactersScreenProps, LocationsScreenProps } from '../shared/types/navigation';

const LocationsScreen = ({ navigation }: LocationsScreenProps) => {
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
		<View>
			<Text>Ola</Text>
		</View>
	);
};

export default LocationsScreen;
