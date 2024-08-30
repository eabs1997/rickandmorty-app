import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

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
		<Stack.Navigator>
			<Stack.Screen
				options={{ headerShown: false }}
				name="AllCharacters"
				component={CharactersDrawerNavigator}
			/>
			<Stack.Screen
				options={{
					contentStyle: { backgroundColor: '#0f1113', borderTopWidth: 1, borderColor: '#3f4042' },
					headerTintColor: '#97ce4c',
					headerStyle: { backgroundColor: '#0f1113' },
					headerBackTitle: 'Characters',
				}}
				name="Detail"
				component={CharacterDetailScreen}
			/>
		</Stack.Navigator>
	);
};

const CharactersDrawerNavigator = () => {
	return (
		// #3f4042
		<Drawer.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: '#0f1113',
				},
				headerTintColor: '#97ce4c',
				drawerContentStyle: {
					backgroundColor: '#0f1113',
					borderColor: '#3f4042',
					borderTopWidth: 5,
				},
				drawerActiveTintColor: '#97ce4c',
				drawerInactiveTintColor: '#8ba2ae',
				sceneContainerStyle: { backgroundColor: '#0f1113' },
			}}
		>
			<Drawer.Screen name="Home" options={{ title: 'Characters' }} component={CharactersScreen} />
			<Drawer.Screen
				name="Favorites"
				options={{ title: 'Favorites' }}
				component={CharactersScreen}
			/>
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
			<StatusBar style="light" />
			<QueryClientProvider client={queryClient}>
				<NavigationContainer>
					<Tab.Navigator
						screenOptions={{
							headerShown: false,
							tabBarStyle: {
								backgroundColor: '#0f1113',
								borderTopColor: '#3f4042',
							},
							tabBarInactiveTintColor: '#8ba2ae',
							tabBarActiveTintColor: '#97ce4c',
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
					</Tab.Navigator>
				</NavigationContainer>
			</QueryClientProvider>
		</>
	);
}
