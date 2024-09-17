import { View, Text, Image, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../shared/constants/colors';
import { CharacterInterface } from '../../shared/interfaces/character';
import { CardStyles } from './CardStyles';
import { Skeleton } from 'moti/skeleton';
import { memo } from 'react';

const Card: React.FC<{
	item: CharacterInterface;
	onPress?: () => void;
	isLoading?: boolean;
	horizontal?: boolean;
}> = ({ item, onPress, horizontal, isLoading = false }) => {
	const styles = CardStyles;

	return (
		<Skeleton.Group show={isLoading}>
			<View style={styles.container}>
				<Pressable onPress={onPress}>
					{horizontal ? (
						<View>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<View style={styles.imageContainer}>
									<Image
										resizeMode="cover"
										source={{ uri: `${item.image}` }}
										style={styles.imageHorizontal}
									/>
								</View>
								<View style={{ flex: 2, padding: 8, height: 120 }}>
									<Text style={styles.title}>{item.name}</Text>
									<View style={{ marginTop: 4 }}>
										<View style={{ flexDirection: 'row', alignItems: 'center' }}>
											<Ionicons
												name="ellipse"
												size={18}
												color={item.status === 'Alive' ? Colors.green500 : Colors.red600}
												style={{ marginEnd: 8 }}
											/>
											<Text style={styles.text}>{item.status}</Text>
										</View>
									</View>
								</View>
							</View>
						</View>
					) : (
						<View>
							<Skeleton radius={16} colors={[Colors.gray400, Colors.gray700, Colors.gray950]}>
								<Image resizeMode="cover" source={{ uri: `${item.image}` }} style={styles.image} />
							</Skeleton>
							<View style={styles.innerContainer}>
								<View>
									<Skeleton
										height={32}
										width={'80%'}
										radius={'square'}
										colors={[Colors.gray400, Colors.gray700, Colors.gray850]}
									>
										<Text style={styles.title}>{item.name}</Text>
									</Skeleton>
									<Skeleton
										height={32}
										width={'60%'}
										radius={'square'}
										colors={[Colors.gray400, Colors.gray700, Colors.gray850]}
									>
										<View style={{ flexDirection: 'row', alignItems: 'center' }}>
											<Ionicons
												name="ellipse"
												size={18}
												color={item.status === 'Alive' ? Colors.green500 : Colors.red600}
												style={{ marginEnd: 8 }}
											/>
											<Text style={styles.text}>
												{item.status} - {item.species}
											</Text>
										</View>
									</Skeleton>
								</View>
								<View style={styles.infoContainer}>
									<Skeleton
										height={24}
										width={'75%'}
										radius={'square'}
										colors={[Colors.gray400, Colors.gray700, Colors.gray850]}
									>
										<View>
											<Text style={[styles.text, { color: Colors.gray100 }]}>
												Last known location:
											</Text>
										</View>
									</Skeleton>
									<Skeleton
										height={24}
										width={'60%'}
										radius={'square'}
										colors={[Colors.gray400, Colors.gray700, Colors.gray850]}
									>
										<View>
											<Text style={styles.text}>{item.location.name}</Text>
										</View>
									</Skeleton>
								</View>
							</View>
						</View>
					)}
				</Pressable>
			</View>
		</Skeleton.Group>
	);
};

export default memo(Card);
