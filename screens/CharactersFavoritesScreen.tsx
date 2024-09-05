import { FlatList, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Card } from '../components/Card';
import { DrawerFavoritesProps } from '../shared/types/navigation';
import { Spinner } from '../components/Spinner';
import { NotFound } from '../components/NotFound';
import { SearchBar } from '../components/SearchBar';
import { getCharacters } from '../services/CharacterService';
import { useCharactersContext } from '../context/CharacterContext';

const CharactersFavoritesScreen = ({ navigation }: DrawerFavoritesProps) => {
	const [searchValue, onChangeText] = useState<string>('');
	const { characters } = useCharactersContext();

	const { data, isLoading } = useQuery({
		queryKey: ['charactersFavorites', characters],
		queryFn: async () => {
			const resp = await getCharacters(characters);
			const dataToFormat = Array.isArray(resp) ? resp : [resp];
			return dataToFormat;
		},
		enabled: !!characters.length,
	});
	console.log(data, characters, searchValue);
	return (
		<>
			<View>
				<SearchBar onSubmit={(value) => onChangeText(value)} />
			</View>

			<FlatList
				data={searchValue.length ? data?.filter((item) => item.name.includes(searchValue)) : data}
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
				ListEmptyComponent={!isLoading ? <NotFound /> : <Spinner isLoading={isLoading} />}
			/>
		</>
	);
};

export default CharactersFavoritesScreen;
