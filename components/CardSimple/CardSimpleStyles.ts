import { StyleSheet } from 'react-native';
import { Colors } from '../../shared/constants/colors';

export const CardSimpleStyles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 16,
		padding: 10,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: Colors.gray700,
		height: 150,
		backgroundColor: Colors.gray950,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 28,
		color: Colors.white,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	text: {
		color: Colors.white,
		fontSize: 20,
	},
});
