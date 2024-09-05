import { useQuery } from '@tanstack/react-query';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { LocationDetailScreenProps } from '../shared/types/navigation';
import { Colors } from '../shared/constants/colors';
import { getLocation } from '../services/LocationService';
import { getCharacters } from '../services/CharacterService';
import { Spinner } from '../components/Spinner';
import { Card } from '../components/Card';

const LocationDetailScreen = ({ route, navigation }: LocationDetailScreenProps) => {
	// Queries
	const { data, isLoading } = useQuery({
		queryKey: ['location', route.params.id],
		queryFn: async () => await getLocation(route.params.id),
	});

	// Then get the user's projects
	const { data: characters, isLoading: isLoadingCharacters } = useQuery({
		queryKey: ['charactersByLocation', data?.residents],
		queryFn: async () => {
			const resp = await getCharacters(data?.residents!);
			const dataToFormat = Array.isArray(resp) ? resp : [resp];
			return dataToFormat;
		},
		// The query will not execute until the userId exists
		enabled: !!data?.residents,
	});
	console.log(data);
	return (
		!isLoading &&
		data && (
			<ScrollView>
				<View style={[styles.container, { padding: 12 }]}>
					<Text style={styles.title}>{data.name}</Text>
					<View style={styles.infoContainer}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Ionicons name="planet-outline" size={20} color="white" style={{ marginEnd: 4 }} />

							<Text style={[styles.text, { color: Colors.gray100 }]}>Dimension</Text>
						</View>
						<Text style={styles.text}>{data.dimension}</Text>
					</View>
					<View style={styles.infoContainer}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Ionicons
								name="people-circle-outline"
								size={20}
								color="white"
								style={{ marginEnd: 4 }}
							/>

							<Text style={[styles.text, { color: Colors.gray100 }]}>Residents:</Text>
							<Text style={styles.text}> {data.residents.length}</Text>
						</View>
					</View>
					<View style={styles.infoContainer}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Text style={[styles.text, { color: Colors.gray100 }]}>Type:</Text>
							<Text style={styles.text}> {data.type}</Text>
						</View>
					</View>
				</View>
				<View style={{ paddingHorizontal: 12 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Ionicons
							name="people-circle-outline"
							size={32}
							color={Colors.green400}
							style={{ marginEnd: 4 }}
						/>
						<Text style={{ color: Colors.green400, fontSize: 32 }}>Residents</Text>
					</View>
				</View>
				{isLoadingCharacters ? (
					<Spinner isLoading={isLoadingCharacters} />
				) : (
					characters && (
						<FlatList
							data={characters}
							scrollEnabled={false}
							renderItem={({ item }) => {
								return (
									<Card
										item={item}
										horizontal={true}
										onPress={() => {
											navigation.navigate('CharacterDetail', { id: item.id, screen: 'Characters' });
										}}
									/>
								);
							}}
							keyExtractor={(item) => `${item.id}`}
						/>
					)
				)}
			</ScrollView>
		)
	);
};

export default LocationDetailScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 16,
		backgroundColor: Colors.gray950,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: Colors.gray700,
	},
	title: {
		fontSize: 32,
		color: Colors.white,
		fontWeight: 'bold',
	},
	text: {
		color: Colors.white,
		fontSize: 22,
	},
	infoContainer: {
		marginTop: 10,
	},
});
