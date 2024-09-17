import { StatusBar } from 'expo-status-bar';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useState } from 'react';
import { CharactersContext } from './context/CharacterContext';
import BottomTabNavigator from './navigation/BottomTabNavigator';

export default function App() {
	const queryClient = new QueryClient();
	const [characters, setCharacters] = useState<number[]>([]);

	return (
		<>
			<StatusBar style="light" />
			<QueryClientProvider client={queryClient}>
				<CharactersContext.Provider value={{ characters, setCharacters }}>
					<BottomTabNavigator />
				</CharactersContext.Provider>
			</QueryClientProvider>
		</>
	);
}
