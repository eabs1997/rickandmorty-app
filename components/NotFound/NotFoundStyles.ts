import { StyleSheet } from 'react-native';
import { Colors } from '../../shared/constants/colors';

export const NotFoundStyles = StyleSheet.create({
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
	buttonContainer: {
		borderColor: Colors.white,
		borderRadius: 4,
		borderWidth: 1,
		padding: 8,
	},
	buttonLabel: { textAlign: 'center', fontSize: 16, fontWeight: 'semibold', color: Colors.white },
});
