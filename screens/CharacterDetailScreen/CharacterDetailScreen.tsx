import { View, Text, Image, ScrollView, SectionList, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { CharacterDetailScreenProps } from '../../shared/types/navigation';
import { Colors } from '../../shared/constants/colors';
import { useCharactersContext } from '../../context/CharacterContext';
import { CharacterInterface } from '../../shared/interfaces/character';
import { CharacterDetailScreenStyles } from './CharacterDetailScreenStyles';
import { useCharacterQuery } from './useCharacterQuery';
import { Skeleton } from 'moti/skeleton';

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

	return (
		data && (
			<ScrollView>
				<Skeleton.Group show={isLoading}>
					<View style={styles.container}>
						<Skeleton radius={16} colors={[Colors.gray400, Colors.gray700, Colors.gray950]}>
							<Image
								resizeMode="cover"
								source={{ uri: `${isLoading ? 'mockUrl' : data.image}` }}
								style={styles.image}
							/>
						</Skeleton>
						<View style={styles.innerContainer}>
							<View>
								<Skeleton
									radius={'square'}
									colors={[Colors.gray400, Colors.gray700, Colors.gray950]}
								>
									<Text style={styles.title}>{data.name}</Text>
								</Skeleton>
								<View
									style={{
										marginTop: 4,
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}
								>
									<Skeleton
										radius={'square'}
										height={24}
										colors={[Colors.gray400, Colors.gray700, Colors.gray950]}
									>
										<View style={{ flexDirection: 'row', alignItems: 'center', width: '88%' }}>
											<Ionicons
												name="ellipse"
												size={18}
												color={data.status === 'Alive' ? Colors.green500 : Colors.red600}
												style={{ marginEnd: 8 }}
											/>
											<Text style={styles.text} numberOfLines={1}>
												{data.status} - {data.species}
											</Text>
										</View>
									</Skeleton>
									<Skeleton
										radius={'square'}
										height={28}
										colors={[Colors.gray400, Colors.gray700, Colors.gray950]}
									>
										<Pressable onPress={() => handledOnPressFav(data)}>
											<View>
												<Ionicons
													name={characters.includes(data.id) ? 'star' : 'star-outline'}
													color={characters.includes(data.id) ? Colors.yellow : Colors.white}
													size={28}
												/>
											</View>
										</Pressable>
									</Skeleton>
								</View>
							</View>
						</View>
					</View>
					<View style={[styles.container, { padding: 12 }]}>
						<Skeleton
							radius={'square'}
							height={32}
							width={'60%'}
							colors={[Colors.gray400, Colors.gray700, Colors.gray950]}
						>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Ionicons
									name="information-circle-outline"
									size={32}
									color={'white'}
									style={{ marginEnd: 8 }}
								/>
								<Text style={{ color: 'white', fontSize: 32 }}>Information</Text>
							</View>
						</Skeleton>
						<View style={styles.infoContainer}>
							<Skeleton
								radius={'square'}
								height={24}
								width={'30%'}
								colors={[Colors.gray400, Colors.gray700, Colors.gray950]}
							>
								<Text style={[styles.text, { color: Colors.gray100 }]}>Gender</Text>
							</Skeleton>
							<Skeleton
								radius={'square'}
								height={24}
								width={'30%'}
								colors={[Colors.gray400, Colors.gray700, Colors.gray950]}
							>
								<Text style={styles.text}>{data.gender}</Text>
							</Skeleton>
						</View>
						<View style={styles.infoContainer}>
							<Skeleton
								radius={'square'}
								width={'60%'}
								colors={[Colors.gray400, Colors.gray700, Colors.gray950]}
							>
								<Text style={[styles.text, { color: Colors.gray100 }]}>Origin</Text>
							</Skeleton>
							<Skeleton
								radius={'square'}
								height={24}
								width={'90%'}
								colors={[Colors.gray400, Colors.gray700, Colors.gray950]}
							>
								<Text style={styles.text}>{data.origin.name}</Text>
							</Skeleton>
						</View>
						<View style={styles.infoContainer}>
							<Skeleton
								radius={'square'}
								height={24}
								width={'70%'}
								colors={[Colors.gray400, Colors.gray700, Colors.gray950]}
							>
								<Text style={[styles.text, { color: Colors.gray100 }]}>Last known location:</Text>
							</Skeleton>
							<Skeleton
								radius={'square'}
								height={24}
								width={'90%'}
								colors={[Colors.gray400, Colors.gray700, Colors.gray950]}
							>
								<Text style={styles.text}>{data.location.name}</Text>
							</Skeleton>
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
				</Skeleton.Group>
			</ScrollView>
		)
	);
};

export default CharacterDetailScreen;
