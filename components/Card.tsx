import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../shared/constants/colors';

export const Card = (props: { item: any; onPress: any }) => {
	const { item, onPress } = props;

	return (
		<View style={styles.container}>
			<Pressable onPress={onPress}>
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
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 16,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: Colors.gray700,
	},
	image: {
		height: 300,
		borderTopRightRadius: 16,
		borderTopLeftRadius: 16,
		flex: 1,
	},
	title: {
		fontSize: 32,
		color: Colors.white,
		fontWeight: 'bold',
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
		marginTop: 20,
	},
});
