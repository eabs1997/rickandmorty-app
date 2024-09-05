import { FlatList, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Card } from '../components/Card';
import { DrawerHomeProps } from '../shared/types/navigation';
import { useCharactersQuery } from '../shared/hooks/useCharactersQuery';
import { Spinner } from '../components/Spinner';
import { NotFound } from '../components/NotFound';
import { SearchBar } from '../components/SearchBar';
import { getFilterCharacters } from '../services/CharacterService';

const CharactersScreen = ({ navigation }: DrawerHomeProps) => {
	const [searchValue, onChangeText] = useState<string>('');

	const { data, fetchNextPage, isFetchingNextPage, isLoading } = useCharactersQuery();

	const { data: filterData, isLoading: isLoadingFilterData } = useQuery({
		queryKey: ['charactersByName', searchValue],
		queryFn: async () => await getFilterCharacters(searchValue),
	});

	return (
		<>
			<View>
				<SearchBar onSubmit={(value) => onChangeText(value)} />
			</View>
			{isLoadingFilterData ? (
				<Spinner isLoading={isLoadingFilterData} />
			) : (
				<FlatList
					data={searchValue ? filterData?.results : data}
					renderItem={({ item }) => {
						return (
							<Card
								item={item}
								onPress={() => {
									navigation.navigate('CharacterDetail', { id: item.id });
								}}
							/>
						);
					}}
					keyExtractor={(item) => `${item.id}`}
					onEndReached={() => !searchValue && fetchNextPage()}
					ListEmptyComponent={!isLoading ? <NotFound /> : <Spinner isLoading={isLoading} />}
					ListFooterComponent={<Spinner isLoading={isFetchingNextPage && !searchValue} />}
				/>
			)}
		</>
	);
};

export default CharactersScreen;
