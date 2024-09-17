import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NotFoundStyles } from './NotFoundStyles';
import { Colors } from '../../shared/constants/colors';

export const NotFound = (props: { reFecth?: () => void }) => {
	const { reFecth } = props;
	const styles = NotFoundStyles;
	return (
		<View style={styles.container}>
			<Ionicons name="search" size={32} color="white" style={{ marginEnd: 8 }} />

			<Text style={styles.text}>Sorry, we couldn't find any results</Text>
			{reFecth && (
				<Pressable
					style={({ pressed }) => [
						styles.buttonContainer,
						pressed && { backgroundColor: Colors.gray850 },
					]}
					onPress={reFecth}
				>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text style={styles.buttonLabel}>Try Again!</Text>
						<Ionicons name="refresh" size={16} color={Colors.white} />
					</View>
				</Pressable>
			)}
		</View>
	);
};
