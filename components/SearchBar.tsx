import { StyleSheet, TextInput, SafeAreaView, View, Pressable, Keyboard } from 'react-native';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from '../shared/constants/colors';

export const SearchBar = (props: { onSubmit: (value: string) => void }) => {
	const { onSubmit } = props;

	const [value, onChangeText] = useState<string>('');

	const handleCloseButton = () => {
		onSubmit('');
		onChangeText('');
		Keyboard.dismiss();
	};

	return (
		<SafeAreaView>
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					inputMode="search"
					placeholderTextColor={Colors.gray100}
					placeholder="Search"
					onChangeText={(text) => onChangeText(text)}
					value={value}
					onSubmitEditing={() => onSubmit(value)}
					maxLength={100}
				/>
				{value && (
					<Pressable onPress={handleCloseButton}>
						<Ionicons name="close-circle" size={16} color={Colors.gray100} />
					</Pressable>
				)}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
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
