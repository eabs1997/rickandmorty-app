import { StyleSheet } from 'react-native';
import { Colors } from '../../shared/constants/colors';

export const LocationDetailScreenStyles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 16,
		backgroundColor: Colors.gray950,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: Colors.gray700,
	},
	title: {
		fontSize: 32,
		color: Colors.white,
		fontWeight: 'bold',
	},
	text: {
		color: Colors.white,
		fontSize: 22,
	},
	infoContainer: {
		marginTop: 10,
	},
});
