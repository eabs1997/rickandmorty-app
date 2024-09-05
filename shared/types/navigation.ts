import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { DrawerScreenProps } from '@react-navigation/drawer';

export type DrawerParamList = {
	Home: undefined;

	CharacterDetail: { id: number };

	Favorites: undefined;
};

export type CharactersStackParamList = {
	AllCharacters: undefined;

	CharacterDetail: { id: number };
};

export type DrawerHomeProps = DrawerScreenProps<DrawerParamList, 'Home'>;

export type DrawerFavoritesProps = DrawerScreenProps<DrawerParamList, 'Favorites'>;

export type LocationsStackParamList = {
	AllLocations: undefined;

	LocationDetail: { id: number };

	CharacterDetail: { id: number; screen: string };
};

export type CharactersScreenProps = NativeStackScreenProps<
	CharactersStackParamList,
	'AllCharacters'
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
	Episodes: undefined;
	Locations: undefined;
};

export type BottomTabProps = BottomTabScreenProps<BottomTabParamList, 'Characters'>;
