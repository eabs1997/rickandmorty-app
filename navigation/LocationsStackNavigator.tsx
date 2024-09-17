import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CharactersStackParamList, LocationsStackParamList } from '../shared/types/navigation';
import { Colors } from '../shared/constants/colors';
import LocationsScreen from '../screens/LocationsScreen/LocationsScreen';
import LocationDetailScreen from '../screens/LocationDetailScreen/LocationDetailScreen';

const LocationsStackNavigator = () => {
	const Stack = createNativeStackNavigator<CharactersStackParamList & LocationsStackParamList>();
	return (
		<Stack.Navigator
			screenOptions={{
				contentStyle: {
					backgroundColor: Colors.gray950,
					borderTopWidth: 1,
					borderColor: Colors.gray700,
				},
				headerTintColor: Colors.green400,
				headerStyle: { backgroundColor: Colors.gray950 },
			}}
		>
			<Stack.Screen
				name="AllLocations"
				options={{ title: 'Locations' }}
				component={LocationsScreen}
			/>
			<Stack.Screen
				options={{ headerBackTitle: 'Locations', title: '' }}
				name="LocationDetail"
				component={LocationDetailScreen}
			/>
		</Stack.Navigator>
	);
};

export default LocationsStackNavigator;
