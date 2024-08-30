import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { DrawerScreenProps } from '@react-navigation/drawer';

export type DrawerParamList = {
	Home: undefined;

	Favorites: undefined;
};

export type CharactersStackParamList = {
	AllCharacters: undefined;

	Detail: { id: number };
};

export type DrawerProps = NativeStackScreenProps<DrawerParamList, 'Home'>;

export type LocationsStackParamList = {
	Detail: { id: number; screen: string };

	AllLocations: undefined;
};

export type CharactersScreenProps = NativeStackScreenProps<
	CharactersStackParamList,
	'AllCharacters'
>;

export type LocationsScreenProps = NativeStackScreenProps<LocationsStackParamList, 'AllLocations'>;

export type CharacterDetailScreenProps = NativeStackScreenProps<CharactersStackParamList, 'Detail'>;

export type BottomTabParamList = {
	Characters: undefined;
	Episodes: undefined;
	Locations: undefined;
};

export type BottomTabProps = BottomTabScreenProps<BottomTabParamList, 'Characters'>;
