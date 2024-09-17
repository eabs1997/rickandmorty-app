import { FlatList, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Card } from '../../components/Card/Card';
import { CharactersScreenProps, CharactersStackParamList } from '../../shared/types/navigation';
import { useCharactersQuery } from './useCharactersQuery';
import { Spinner } from '../../components/Spinner/Spinner';
import { NotFound } from '../../components/NotFound/NotFound';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { getFilterCharacters } from '../../services/CharacterService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CharacterInterface } from '../../shared/interfaces/character';

const CharactersScreen = ({ navigation }: CharactersScreenProps) => {
	const [searchValue, onChangeText] = useState<string>('');

	const { data, fetchNextPage, isFetchingNextPage, isLoading } = useCharactersQuery();

	const { data: filterData, isLoading: isLoadingFilterData } = useQuery({
		queryKey: ['charactersByName', searchValue],
		queryFn: async () => await getFilterCharacters(searchValue),
	});

	const renderItemHandler = (
		item: CharacterInterface,
		navigation: NativeStackNavigationProp<CharactersStackParamList, 'AllCharacters', undefined>
	) => {
		return (
			<Card
				item={item}
				onPress={() => {
					navigation.navigate('CharacterDetail', { id: item.id });
				}}
			/>
		);
	};

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
					renderItem={({ item }) => renderItemHandler(item, navigation)}
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
