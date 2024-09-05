import { FlatList, Text, View, StyleSheet, Pressable } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { LocationsScreenProps } from '../shared/types/navigation';
import { Colors } from '../shared/constants/colors';
import { useLocationsQuery } from '../shared/hooks/useLocationsQuery';
import { Spinner } from '../components/Spinner';
import { NotFound } from '../components/NotFound';
import { SearchBar } from '../components/SearchBar';
import { getFilterLocations } from '../services/LocationService';

const LocationsScreen = ({ navigation }: LocationsScreenProps) => {
	const [searchValue, onChangeText] = useState<string>('');

	const { data, fetchNextPage, isFetchingNextPage, isLoading } = useLocationsQuery();

	const { data: filterData, isLoading: isLoadingFilterData } = useQuery({
		queryKey: ['locationByName', searchValue],
		queryFn: async () => await getFilterLocations(searchValue),
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

export default LocationsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 16,
		padding: 10,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: Colors.gray700,
		height: 150,
		backgroundColor: Colors.gray950,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 28,
		color: Colors.white,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	text: {
		color: Colors.white,
		fontSize: 20,
	},
});
