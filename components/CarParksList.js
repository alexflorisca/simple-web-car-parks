import React from 'react';
import {
	ActivityIndicator,
  FlatList,
	StyleSheet,
  Text
} from 'react-native';

export default function CarParksList(props) {
	const { isError, isLoading, carParks } = props;
  if (isLoading && !isError) {
		return <ActivityIndicator style={styles.loading} />
	}

	if (isError) {
		return <Text>Error!</Text>;
	}

	if(carParks.length === 0) {
		return <Text>No car parks found</Text>
	}

	return <FlatList
		keyExtractor={item => item.id.toString()}
		data={carParks}
		renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}>
	</FlatList>
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
	loading: {
    padding: 10
  },
});