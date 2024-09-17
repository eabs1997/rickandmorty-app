import { View, Text, Image, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../shared/constants/colors';
import { CharacterInterface } from '../../shared/interfaces/character';
import { CardStyles } from './CardStyles';

export const Card = (props: {
	item: CharacterInterface;
	onPress: () => void;
	horizontal?: boolean;
}) => {
	const styles = CardStyles;
	const { item, onPress, horizontal } = props;

	return (
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
				) : (
					<View>
						<Image resizeMode="cover" source={{ uri: `${item.image}` }} style={styles.image} />
						<View style={styles.innerContainer}>
							<View>
								<Text style={styles.title}>{item.name}</Text>
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
							</View>
							<View style={styles.infoContainer}>
								<Text style={[styles.text, { color: Colors.gray100 }]}>Last known location:</Text>
								<Text style={styles.text}>{item.location.name}</Text>
							</View>
						</View>
					</View>
				)}
			</Pressable>
		</View>
	);
};
