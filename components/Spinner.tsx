import { ActivityIndicator, View, StyleSheet } from 'react-native';

export const Spinner = (props: { isLoading: boolean }) => {
	const { isLoading } = props;

	return <View style={styles.container}>{isLoading && <ActivityIndicator />}</View>;
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
