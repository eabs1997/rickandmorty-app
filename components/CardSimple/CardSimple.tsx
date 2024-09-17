import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Skeleton } from 'moti/skeleton';
import { View, Pressable, Text } from 'react-native';
import { LocationInterface } from '../../shared/interfaces/locations';
import { LocationsStackParamList } from '../../shared/types/navigation';
import { Colors } from '../../shared/constants/colors';
import { CardSimpleStyles } from './CardSimpleStyles';
import { memo } from 'react';

const CardSimple: React.FC<{
	item: LocationInterface;
	navigation: NativeStackNavigationProp<LocationsStackParamList, 'AllLocations', undefined>;
	isLoading: boolean;
}> = ({ item, navigation, isLoading }) => {
	const styles = CardSimpleStyles;
	return (
		<View>
			<Pressable
				style={styles.container}
				onPress={() => {
					navigation.navigate('LocationDetail', { id: item.id });
				}}
			>
				<Skeleton.Group show={isLoading}>
					<Skeleton
						radius={'square'}
						width={'100%'}
						colors={[Colors.gray400, Colors.gray700, Colors.gray950]}
					>
						<Text style={styles.title}>{item.name}</Text>
					</Skeleton>
					<Skeleton
						radius={'square'}
						width={isLoading ? '50%' : 'auto'}
						colors={[Colors.gray400, Colors.gray700, Colors.gray950]}
					>
						<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
							<Text style={[styles.text, { color: Colors.gray100 }]}>Residents: </Text>

							<Text style={styles.text}>{item.residents.length}</Text>
						</View>
					</Skeleton>
				</Skeleton.Group>
			</Pressable>
		</View>
	);
};

export default memo(CardSimple);
