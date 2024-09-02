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
} from './shared/types/navigation';
import CharacterDetailScreen from './screens/CharacterDetailScreen';
import LocationsScreen from './screens/LocationsScreen';
import { Colors } from './shared/constants/colors';

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
					contentStyle: {
						backgroundColor: Colors.gray950,
						borderTopWidth: 1,
						borderColor: Colors.gray700,
					},
					headerTintColor: Colors.green400,
					headerStyle: { backgroundColor: Colors.gray950 },
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
		<Drawer.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors.gray950,
				},
				headerTintColor: Colors.green400,
				drawerContentStyle: {
					backgroundColor: Colors.gray950,
					borderColor: Colors.gray700,
					borderTopWidth: 5,
				},
				drawerActiveTintColor: Colors.green400,
				drawerInactiveTintColor: Colors.gray100,
				sceneContainerStyle: { backgroundColor: Colors.gray950 },
			}}
		>
			<Drawer.Screen name="Home" options={{ title: 'Characters' }} component={CharactersScreen} />
			{/* <Drawer.Screen
				name="Favorites"
				options={{ title: 'Favorites' }}
				component={CharactersScreen}
			/> */}
		</Drawer.Navigator>
	);
};

const LocationsStackNavigator = () => {
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
					title: 'Locations',
				}}
				name="AllLocations"
				component={LocationsScreen}
			/>
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
					</Tab.Navigator>
				</NavigationContainer>
			</QueryClientProvider>
		</>
	);
}
