import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type CharactersStackParamList = {
	AllCharacters: undefined;

	CharacterDetail: { id: number };
};

export type LocationsStackParamList = {
	AllLocations: undefined;

	LocationDetail: { id: number };

	CharacterDetail: { id: number; screen: string };
};

export type CharactersScreenProps = NativeStackScreenProps<
	CharactersStackParamList,
	'AllCharacters'
>;

export type CharacterScreenProps = NativeStackScreenProps<
	CharactersStackParamList,
	'CharacterDetail'
>;

export type LocationsScreenProps = NativeStackScreenProps<LocationsStackParamList, 'AllLocations'>;

export type LocationDetailScreenProps = NativeStackScreenProps<
	LocationsStackParamList,
	'LocationDetail'
>;

export type CharacterDetailScreenProps = NativeStackScreenProps<
	CharactersStackParamList,
	'CharacterDetail'
>;

export type BottomTabParamList = {
	Characters: undefined;
	Locations: undefined;
	Favorites: undefined;
	CharacterDetail: { id: number; screen: string };
};

export type BottomTabProps = BottomTabScreenProps<BottomTabParamList, 'Characters'>;

export type BottomTabFavoritesProps = BottomTabScreenProps<BottomTabParamList, 'Favorites'>;
