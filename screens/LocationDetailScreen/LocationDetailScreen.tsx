import { View, Text, VirtualizedList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { LocationDetailScreenProps } from '../../shared/types/navigation';
import { Colors } from '../../shared/constants/colors';
import { LocationDetailScreenStyles } from './LocationDetailScreenStyles';
import { useLocationQuery } from './useLocationQuery';
import { CharacterInterface } from '../../shared/interfaces/character';
import { Spinner } from '../../components/Spinner/Spinner';
import Card from '../../components/Card/Card';

const LocationDetailScreen = ({ route }: LocationDetailScreenProps) => {
	const styles = LocationDetailScreenStyles;

	const { isLoading, data, characters } = useLocationQuery(route);

	const renderItemHandler = (item: CharacterInterface, residents: number) => {
		return residents ? <Card item={item} horizontal={true} /> : <></>;
	};

	return isLoading ? (
		<Spinner isLoading={isLoading} />
	) : (
		data && (
			<VirtualizedList
				data={characters}
				renderItem={({ item }) => renderItemHandler(item, data.residents.length)}
				ListHeaderComponent={() => {
					return (
						<>
							<View style={[styles.container, { padding: 12 }]}>
								<Text style={styles.title}>{data.name}</Text>
								<View style={styles.infoContainer}>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<Ionicons
											name="planet-outline"
											size={20}
											color="white"
											style={{ marginEnd: 4 }}
										/>

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
							<View
								style={[{ paddingHorizontal: 12 }, !data.residents.length && { display: 'none' }]}
							>
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
						</>
					);
				}}
				ListEmptyComponent={() => <></>}
				keyExtractor={(item, i) => `${item?.id}-${i}`}
				getItem={(_data: unknown, i: number) => {
					const data = _data as CharacterInterface[];
					return data[i] as CharacterInterface;
				}}
				getItemCount={(_data: unknown) => characters?.length || 1}
			/>
		)
	);
};

export default LocationDetailScreen;
