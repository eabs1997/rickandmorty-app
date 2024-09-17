import { StyleSheet, TextInput, SafeAreaView, View, Pressable, Keyboard } from 'react-native';
import { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from '../../shared/constants/colors';
import { SearchBarStyles } from './SearchBarStyles';

export const SearchBar = (props: { onSubmit: (value: string) => void }) => {
	const styles = SearchBarStyles;

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
