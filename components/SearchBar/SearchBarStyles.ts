import { StyleSheet } from 'react-native';
import { Colors } from '../../shared/constants/colors';

export const SearchBarStyles = StyleSheet.create({
	container: {
		marginHorizontal: 16,
		marginVertical: 8,
		borderWidth: 1,
		borderRadius: 8,
		padding: 8,
		height: 40,
		borderColor: Colors.gray700,
		flexDirection: 'row',
		alignItems: 'center',
	},
	input: {
		flex: 1,
		color: Colors.white,
	},
});
