import { FlatList, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { LocationsScreenProps } from '../../shared/types/navigation';
import { useLocationsQuery } from './useLocationsQuery';
import { Spinner } from '../../components/Spinner/Spinner';
import { NotFound } from '../../components/NotFound/NotFound';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { getFilterLocations } from '../../services/LocationService';
import { mockLocation } from '../../shared/mocks/mockLocation';
import CardSimple from '../../components/CardSimple/CardSimple';

const LocationsScreen = ({ navigation }: LocationsScreenProps) => {
	const [searchValue, onChangeText] = useState<string>('');

	const { data, fetchNextPage, isFetchingNextPage, isLoading } = useLocationsQuery();

	const {
		data: filterData,
		isLoading: isLoadingFilterData,
		refetch,
	} = useQuery({
		queryKey: ['locationByName', searchValue],
		queryFn: async () => await getFilterLocations(searchValue),
	});

	return (
		<>
			<View>
				<SearchBar onSubmit={(value) => onChangeText(value)} />
			</View>

			<FlatList
				data={searchValue ? filterData?.results : data}
				renderItem={({ item }) => (
					<CardSimple
						item={item}
						navigation={navigation}
						isLoading={isLoading || isLoadingFilterData}
					/>
				)}
				keyExtractor={(item) => `${item.id}`}
				onEndReached={() => !searchValue && fetchNextPage()}
				ListEmptyComponent={
					!isLoading || !isLoadingFilterData ? (
						<NotFound reFecth={() => refetch()} />
					) : (
						<CardSimple
							item={mockLocation}
							navigation={navigation}
							isLoading={isLoading || isLoadingFilterData}
						/>
					)
				}
				ListFooterComponent={<Spinner isLoading={isFetchingNextPage && !searchValue} />}
			/>
		</>
	);
};

export default LocationsScreen;
