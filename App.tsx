import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CharactersScreen from './screens/CharactersScreen';

import {
	BottomTabParamList,
	CharactersStackParamList,
	DrawerParamList,
	LocationsStackParamList,
} from './types/navigation';
import CharacterDetailScreen from './screens/CharacterDetailScreen';
import LocationsScreen from './screens/LocationsScreen';

const Stack = createNativeStackNavigator<CharactersStackParamList & LocationsStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();
const Drawer = createDrawerNavigator<DrawerParamList & CharactersStackParamList>();

const queryClient = new QueryClient();

const CharactersStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: '#272b33' } }}>
			<Stack.Screen
				options={{ headerShown: false }}
				name="AllCharacters"
				component={CharactersDrawerNavigator}
			/>
			<Stack.Screen name="Detail" component={CharacterDetailScreen} />
		</Stack.Navigator>
	);
};

const CharactersDrawerNavigator = () => {
	return (
		<Drawer.Navigator id="drawer">
			<Drawer.Screen name="Home" options={{ title: 'Characters' }} component={CharactersScreen} />
		</Drawer.Navigator>
	);
};

const LocationsStackNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="AllLocations" component={LocationsScreen} />
		</Stack.Navigator>
	);
};

export default function App() {
	return (
		<>
			<StatusBar style="auto" />
			<QueryClientProvider client={queryClient}>
				<NavigationContainer>
					<Tab.Navigator>
						<Tab.Group screenOptions={{ headerShown: false }}>
							<Tab.Screen name="Characters" component={CharactersStackNavigator} />
							<Tab.Screen name="Locations" component={LocationsStackNavigator} />
						</Tab.Group>
					</Tab.Navigator>
				</NavigationContainer>
			</QueryClientProvider>
		</>
	);
}
