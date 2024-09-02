import { useQuery } from '@tanstack/react-query';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { LocationsScreenProps } from '../shared/types/navigation';
import { getAllLocations } from '../services/LocationService';
import { Colors } from '../shared/constants/colors';

const LocationsScreen = ({ navigation }: LocationsScreenProps) => {
	// Queries
	const { data } = useQuery({
		queryKey: ['locations'],
		queryFn: async () => await getAllLocations(),
	});

	return (
		<FlatList
			data={data?.results}
			renderItem={({ item }) => {
				return (
					<View style={styles.container}>
						<Text style={styles.title}>{item.name}</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={[styles.text, { color: Colors.gray100 }]}>Residents: </Text>
							<Text style={styles.text}>{item.residents.length}</Text>
						</View>
					</View>
				);
			}}
			keyExtractor={(item) => `${item.id}`}
		/>
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
