import { FlatList, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Card } from '../../components/Card/Card';
import { Spinner } from '../../components/Spinner/Spinner';
import { NotFound } from '../../components/NotFound/NotFound';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { getCharacters } from '../../services/CharacterService';
import { useCharactersContext } from '../../context/CharacterContext';
import { Colors } from '../../shared/constants/colors';
import { CharacterInterface } from '../../shared/interfaces/character';
import { BottomTabFavoritesProps, BottomTabParamList } from '../../shared/types/navigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

const CharactersFavoritesScreen = ({ navigation }: BottomTabFavoritesProps) => {
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

	const renderItemHandler = (
		item: CharacterInterface,
		navigation: BottomTabNavigationProp<BottomTabParamList, 'Favorites', undefined>
	) => {
		return (
			<Card
				item={item}
				onPress={() => {
					navigation.navigate('CharacterDetail', { id: item.id, screen: 'Characters' });
				}}
			/>
		);
	};

	return (
		<View
			style={{
				backgroundColor: Colors.gray950,
				flex: 1,
			}}
		>
			<View>
				<SearchBar onSubmit={(value) => onChangeText(value)} />
			</View>

			<FlatList
				data={searchValue.length ? data?.filter((item) => item.name.includes(searchValue)) : data}
				renderItem={({ item }) => renderItemHandler(item, navigation)}
				keyExtractor={(item) => `${item.id}`}
				ListEmptyComponent={!isLoading ? <NotFound /> : <Spinner isLoading={isLoading} />}
			/>
		</View>
	);
};

export default CharactersFavoritesScreen;
