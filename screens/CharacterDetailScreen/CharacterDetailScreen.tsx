import { View, Text, Image, ScrollView, SectionList, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { CharacterDetailScreenProps } from '../../shared/types/navigation';
import { Colors } from '../../shared/constants/colors';
import { useCharactersContext } from '../../context/CharacterContext';
import { CharacterInterface } from '../../shared/interfaces/character';
import { CharacterDetailScreenStyles } from './CharacterDetailScreenStyles';
import { useCharacterQuery } from './useCharacterQuery';
import { Spinner } from '../../components/Spinner/Spinner';

const CharacterDetailScreen = ({ route }: CharacterDetailScreenProps) => {
	const styles = CharacterDetailScreenStyles;
	const { characters, setCharacters } = useCharactersContext();

	const { data, isLoading, episodes } = useCharacterQuery(route);

	const handledOnPressFav = (data: CharacterInterface) => {
		if (characters.includes(data.id)) {
			setCharacters(characters.filter((character) => character !== data.id));
		} else {
			setCharacters([...characters, data.id]);
		}
	};

	return isLoading ? (
		<Spinner isLoading={isLoading} />
	) : (
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
								<Pressable onPress={() => handledOnPressFav(data)} style={{ marginStart: 'auto' }}>
									<View>
										<Ionicons
											name={characters.includes(data.id) ? 'star' : 'star-outline'}
											color={characters.includes(data.id) ? Colors.yellow : Colors.white}
											size={28}
										/>
									</View>
								</Pressable>
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
					{!isLoading && episodes && (
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
