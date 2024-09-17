import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { SpinnerStyles } from './SpinnerStyles';

export const Spinner = (props: { isLoading: boolean }) => {
	const styles = SpinnerStyles;

	const { isLoading } = props;

	return <View style={styles.container}>{isLoading && <ActivityIndicator />}</View>;
};
