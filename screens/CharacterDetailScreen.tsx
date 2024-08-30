import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { FlatList, View, Text, Image, StyleSheet, ScrollView, SectionList } from 'react-native';
import { getCharacter } from '../services/CharactersService';
import { CharacterDetailScreenProps } from '../types/navigation';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getEpisodes } from '../services/EpisodeServirce';
import { formatEpisodes } from '../utils/FormatEpisodes';

const CharacterDetailScreen = ({ route }: CharacterDetailScreenProps) => {
	// Queries
	const { data, isLoading } = useQuery({
		queryKey: ['character', route.params.id],
		queryFn: async () => await getCharacter(route.params.id),
	});
	console.log(data);

	// Then get the user's projects
	const { data: episodes, isLoading: isLoadingEpisodes } = useQuery({
		queryKey: ['episodes', data?.episode],
		queryFn: async () => {
			const resp = await getEpisodes(data.episode);
			console.log(resp, ';;;;');
			return formatEpisodes(resp?.length ? resp : [resp]);
		},
		// The query will not execute until the userId exists
		enabled: !!data?.episode,
	});
	console.log(episodes, 12);
	return (
		!isLoading && (
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
									color={data.status === 'Alive' ? '#55cc44' : '#d63d2e'}
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
						<Text style={[styles.text, { color: '#8ba2ae' }]}>Gender</Text>
						<Text style={styles.text}>{data.gender}</Text>
					</View>
					<View style={styles.infoContainer}>
						<Text style={[styles.text, { color: '#8ba2ae' }]}>Origin</Text>
						<Text style={styles.text}>{data.origin.name}</Text>
					</View>
					<View style={styles.infoContainer}>
						<Text style={[styles.text, { color: '#8ba2ae' }]}>Last known location:</Text>
						<Text style={styles.text}>{data.location.name}</Text>
					</View>
				</View>
				<View style={[styles.container, { padding: 12 }]}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Ionicons name="list" size={32} color="white" style={{ marginEnd: 8 }} />
						<Text style={{ color: 'white', fontSize: 32 }}>Seasons</Text>
					</View>
					{!isLoadingEpisodes && (
						<SectionList
							sections={episodes}
							scrollEnabled={false}
							keyExtractor={(item, i) => item?.id}
							renderItem={({ item }) => (
								<View style={styles.item}>
									<Text style={styles.text}>
										EP {item.episode.split('E')[1]} {item.name}
									</Text>
									<Text style={styles.subText}>{item.air_date}</Text>
								</View>
							)}
							renderSectionHeader={({ section: { title } }) => (
								<Text style={[styles.title, { marginTop: 12, color: '#8ba2ae' }]}>{title}</Text>
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
		backgroundColor: '#0f1113',
		borderRadius: 16,
		borderWidth: 1,
		borderColor: '#3f4042',
	},
	image: {
		height: 400,
		borderTopRightRadius: 16,
		borderTopLeftRadius: 16,
		flex: 1,
	},
	title: {
		fontSize: 32,
		color: 'white',
		fontWeight: 'bold',
	},
	subText: {
		color: 'white',
		fontSize: 16,
	},
	item: {
		marginTop: 16,
	},
	text: {
		color: 'white',
		fontSize: 24,
	},
	innerContainer: {
		padding: 12,
		textAlign: 'left',
		backgroundColor: '#0f1113',
		borderTopWidth: 2,
		borderColor: '#3f4042',
		borderBottomRightRadius: 14,
		borderBottomLeftRadius: 14,
	},
	infoContainer: {
		marginTop: 10,
	},
});
