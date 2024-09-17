import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CharacterDetailScreen from '../screens/CharacterDetailScreen/CharacterDetailScreen';
import CharactersScreen from '../screens/CharactersScreen/CharactersScreen';
import { Colors } from '../shared/constants/colors';
import { CharactersStackParamList, LocationsStackParamList } from '../shared/types/navigation';

const CharactersStackNavigator = () => {
	const Stack = createNativeStackNavigator<CharactersStackParamList & LocationsStackParamList>();
	return (
		<Stack.Navigator>
			<Stack.Screen
				options={{
					contentStyle: {
						backgroundColor: Colors.gray950,
						borderTopWidth: 1,
						borderColor: Colors.gray700,
					},
					headerTintColor: Colors.green400,
					headerStyle: { backgroundColor: Colors.gray950 },
					headerBackTitle: 'Characters',
					title: 'Characters',
				}}
				name="AllCharacters"
				component={CharactersScreen}
			/>
			<Stack.Screen
				options={{
					contentStyle: {
						backgroundColor: Colors.gray950,
						borderTopWidth: 1,
						borderColor: Colors.gray700,
					},
					headerTintColor: Colors.green400,
					headerStyle: { backgroundColor: Colors.gray950 },
					headerBackTitle: 'Characters',
					title: '',
				}}
				name="CharacterDetail"
				component={CharacterDetailScreen}
			/>
		</Stack.Navigator>
	);
};

export default CharactersStackNavigator;
