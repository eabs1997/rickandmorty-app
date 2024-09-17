import { StyleSheet } from 'react-native';
import { Colors } from '../../shared/constants/colors';

export const CardStyles = StyleSheet.create({
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
	imageContainer: {
		flex: 1,
	},
	imageHorizontal: {
		height: 120,
		borderBottomLeftRadius: 16,
		borderTopLeftRadius: 16,
		flex: 1,
	},
	infoContainer: {
		marginTop: 20,
	},
});
