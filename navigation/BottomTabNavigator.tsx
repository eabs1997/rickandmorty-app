import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { BottomTabParamList } from '../shared/types/navigation';
import CharactersStackNavigator from './CharactersStack';
import LocationsStackNavigator from './LocationsStackNavigator';
import { Colors } from '../shared/constants/colors';
import CharactersFavoritesScreen from '../screens/CharactersFavoritesScreen/CharactersFavoritesScreen';

const BottomTabNavigator = () => {
	const Tab = createBottomTabNavigator<BottomTabParamList>();

	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={{
					headerShown: false,
					headerStyle: {
						backgroundColor: Colors.gray950,
					},

					headerTintColor: Colors.green400,
					tabBarStyle: {
						backgroundColor: Colors.gray950,
						borderTopColor: Colors.gray700,
					},
					tabBarInactiveTintColor: Colors.gray100,
					tabBarActiveTintColor: Colors.green400,
				}}
			>
				<Tab.Screen
					name="Characters"
					options={{
						tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} />,
					}}
					component={CharactersStackNavigator}
				/>
				<Tab.Screen
					name="Locations"
					options={{
						tabBarIcon: ({ color }) => <Ionicons name="location" size={24} color={color} />,
					}}
					component={LocationsStackNavigator}
				/>
				<Tab.Screen
					name="Favorites"
					options={{
						tabBarIcon: ({ color }) => <Ionicons name="star" size={24} color={color} />,
						headerShown: true,
					}}
					component={CharactersFavoritesScreen}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default BottomTabNavigator;
