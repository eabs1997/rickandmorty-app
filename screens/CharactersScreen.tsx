import { useQueryClient, useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { getAllCharacters } from '../services/CharacterService';
import { Card } from '../components/Card';
import { DrawerProps } from '../shared/types/navigation';
import { useCharactersQuery } from '../shared/hooks/useCharactersQuery';
import { Spinner } from '../components/Spinner';

const CharactersScreen = ({ navigation }: DrawerProps) => {
	const { data, fetchNextPage, isFetchingNextPage } = useCharactersQuery();

	return (
		<FlatList
			data={data}
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
			onEndReached={() => fetchNextPage()}
			ListFooterComponent={<Spinner isLoading={isFetchingNextPage} />}
		/>
	);
};

export default CharactersScreen;
