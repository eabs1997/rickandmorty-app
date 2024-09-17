import { FlatList, Text, View, Pressable } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { LocationsScreenProps, LocationsStackParamList } from '../../shared/types/navigation';
import { Colors } from '../../shared/constants/colors';
import { useLocationsQuery } from './useLocationsQuery';
import { Spinner } from '../../components/Spinner/Spinner';
import { NotFound } from '../../components/NotFound/NotFound';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { getFilterLocations } from '../../services/LocationService';
import { LocationsScreenStyles } from './LocationsScreenStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LocationInterface } from '../../shared/interfaces/locations';

const LocationsScreen = ({ navigation }: LocationsScreenProps) => {
	const styles = LocationsScreenStyles;

	const [searchValue, onChangeText] = useState<string>('');

	const { data, fetchNextPage, isFetchingNextPage, isLoading } = useLocationsQuery();

	const { data: filterData, isLoading: isLoadingFilterData } = useQuery({
		queryKey: ['locationByName', searchValue],
		queryFn: async () => await getFilterLocations(searchValue),
	});

	const renderItemHandler = (
		item: LocationInterface,
		navigation: NativeStackNavigationProp<LocationsStackParamList, 'AllLocations', undefined>
	) => {
		return (
			<View>
				<Pressable
					style={styles.container}
					onPress={() => {
						navigation.navigate('LocationDetail', { id: item.id });
					}}
				>
					<Text style={styles.title}>{item.name}</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text style={[styles.text, { color: Colors.gray100 }]}>Residents: </Text>
						<Text style={styles.text}>{item.residents.length}</Text>
					</View>
				</Pressable>
			</View>
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

export default LocationsScreen;
