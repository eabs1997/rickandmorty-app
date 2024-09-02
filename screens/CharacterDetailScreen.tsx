import { useQuery } from '@tanstack/react-query';
import { View, Text, Image, StyleSheet, ScrollView, SectionList } from 'react-native';
import { getCharacter } from '../services/CharacterService';
import { CharacterDetailScreenProps } from '../shared/types/navigation';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getEpisodes } from '../services/EpisodeServirce';
import { formatEpisodes } from '../utils/FormatEpisodes';
import { Colors } from '../shared/constants/colors';

const CharacterDetailScreen = ({ route }: CharacterDetailScreenProps) => {
	// Queries
	const { data, isLoading } = useQuery({
		queryKey: ['character', route.params.id],
		queryFn: async () => await getCharacter(route.params.id),
	});

	// Then get the user's projects
	const { data: episodes, isLoading: isLoadingEpisodes } = useQuery({
		queryKey: ['episodes', data?.episode],
		queryFn: async () => {
			const resp = await getEpisodes(data?.episode!);
			const dataToFormat = Array.isArray(resp) ? resp : [resp];
			return formatEpisodes(dataToFormat);
		},
		// The query will not execute until the userId exists
		enabled: !!data?.episode,
	});

	return (
		!isLoading &&
		data && (
			<ScrollView>
				<View style={styles.container}>
					<Image resizeMode="cover" source={{ uri: `${data.image}` }} style={styles.image} />
					<View style={styles.innerContainer}>
						<View>
							<Text style={styles.title}>{data.name}</Text>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Ionicons
									name="ellipse"
									size={18}
									color={data.status === 'Alive' ? Colors.green500 : Colors.red600}
									style={{ marginEnd: 8 }}
								/>
								<Text style={styles.text}>
									{data.status} - {data.species}
								</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={[styles.container, { padding: 12 }]}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Ionicons
							name="information-circle-outline"
							size={32}
							color={'white'}
							style={{ marginEnd: 8 }}
						/>
						<Text style={{ color: 'white', fontSize: 32 }}>Information</Text>
					</View>
					<View style={styles.infoContainer}>
						<Text style={[styles.text, { color: Colors.gray100 }]}>Gender</Text>
						<Text style={styles.text}>{data.gender}</Text>
					</View>
					<View style={styles.infoContainer}>
						<Text style={[styles.text, { color: Colors.gray100 }]}>Origin</Text>
						<Text style={styles.text}>{data.origin.name}</Text>
					</View>
					<View style={styles.infoContainer}>
						<Text style={[styles.text, { color: Colors.gray100 }]}>Last known location:</Text>
						<Text style={styles.text}>{data.location.name}</Text>
					</View>
				</View>
				<View style={[styles.container, { padding: 12 }]}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Ionicons name="list" size={32} color="white" style={{ marginEnd: 8 }} />
						<Text style={{ color: 'white', fontSize: 32 }}>Seasons</Text>
					</View>
					{!isLoadingEpisodes && episodes && (
						<SectionList
							sections={episodes}
							scrollEnabled={false}
							keyExtractor={(item, i) => `${item.id}`}
							renderItem={({ item }) => (
								<View style={styles.item}>
									<Text style={styles.text}>
										EP {item.episode.split('E')[1]} {item.name}
									</Text>
									<Text style={styles.subText}>{item.air_date}</Text>
								</View>
							)}
							renderSectionHeader={({ section: { title } }) => (
								<Text style={[styles.title, { marginTop: 12, color: Colors.gray100 }]}>
									{title}
								</Text>
							)}
						/>
					)}
				</View>
			</ScrollView>
		)
	);
};

export default CharacterDetailScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 16,
		backgroundColor: Colors.gray950,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: Colors.gray700,
	},
	image: {
		height: 400,
		borderTopRightRadius: 16,
		borderTopLeftRadius: 16,
		flex: 1,
	},
	title: {
		fontSize: 32,
		color: Colors.white,
		fontWeight: 'bold',
	},
	subText: {
		color: Colors.white,
		fontSize: 16,
	},
	item: {
		marginTop: 16,
	},
	text: {
		color: Colors.white,
		fontSize: 24,
	},
	innerContainer: {
		padding: 12,
		textAlign: 'left',
		backgroundColor: Colors.gray950,
		borderTopWidth: 2,
		borderColor: Colors.gray700,
		borderBottomRightRadius: 14,
		borderBottomLeftRadius: 14,
	},
	infoContainer: {
		marginTop: 10,
	},
});
