import { Text, View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../shared/constants/colors';

export const NotFound = () => {
	return (
		<View style={styles.container}>
			<Ionicons name="search" size={32} color="white" style={{ marginEnd: 8 }} />

			<Text style={styles.text}>Sorry, we couldn't find any results</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 16,
		paddingVertical: 20,
	},
	text: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: 'bold',
		color: Colors.white,
		marginVertical: 16,
	},
});
