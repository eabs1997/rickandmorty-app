import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

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
								color={item.status === 'Alive' ? '#55cc44' : '#d63d2e'}
								style={{ marginEnd: 8 }}
							/>
							<Text style={styles.text}>
								{item.status} - {item.species}
							</Text>
						</View>
					</View>
					<View style={styles.infoContainer}>
						<Text style={[styles.text, { color: '#8ba2ae' }]}>Last known location:</Text>
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
		borderColor: '#3f4042',
	},
	image: {
		height: 300,
		borderTopRightRadius: 16,
		borderTopLeftRadius: 16,
		flex: 1,
	},
	title: {
		fontSize: 32,
		color: 'white',
		fontWeight: 'bold',
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
		marginTop: 20,
	},
});
