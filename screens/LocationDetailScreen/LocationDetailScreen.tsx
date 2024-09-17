import { View, Text, ScrollView, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { LocationDetailScreenProps, LocationsStackParamList } from '../../shared/types/navigation';
import { Colors } from '../../shared/constants/colors';
import { Spinner } from '../../components/Spinner/Spinner';
import { Card } from '../../components/Card/Card';
import { LocationDetailScreenStyles } from './LocationDetailScreenStyles';
import { useLocationQuery } from './useLocationQuery';
import { CharacterInterface } from '../../shared/interfaces/character';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const LocationDetailScreen = ({ route, navigation }: LocationDetailScreenProps) => {
	const styles = LocationDetailScreenStyles;

	const { isLoading, data, characters } = useLocationQuery(route);

	function renderItemHandler(
		item: CharacterInterface,
		navigation: NativeStackNavigationProp<LocationsStackParamList, 'LocationDetail', undefined>
	) {
		return (
			<Card
				item={item}
				horizontal={true}
				onPress={() => {
					navigation.navigate('CharacterDetail', { id: item.id, screen: 'Characters' });
				}}
			/>
		);
	}

	return isLoading ? (
		<Spinner isLoading={isLoading} />
	) : (
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
				{isLoading ? (
					<Spinner isLoading={isLoading} />
				) : (
					characters && (
						<FlatList
							data={characters}
							scrollEnabled={false}
							renderItem={({ item }) => renderItemHandler(item, navigation)}
							keyExtractor={(item) => `${item.id}`}
						/>
					)
				)}
			</ScrollView>
		)
	);
};

export default LocationDetailScreen;
