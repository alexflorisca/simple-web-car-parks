import React, { useState } from 'react';
import {
  Button,
	StyleSheet,
  View
} from 'react-native';

export default function Filters(props) {
	const [filterParkAndRide, setParkAndRide] = useState(false);
  const [filterElectricChargePoint, setElectricChargePoint] = useState(false);

	return (<View style={styles.filters}>
		<View style={styles.filterParkAndRide}>
			<Button 
				title="Park and Ride"
				onPress={() => {
					setParkAndRide(!filterParkAndRide);
					props.getCarParks(null, {
						filterParkAndRide: !filterParkAndRide,
						filterElectricChargePoint
					});
				}}
				color={ filterParkAndRide ? '#2196F3' : '#8fcaf9'}
				accessibilityLabel="Filter by Park and Ride"
				 />
		</View>
		<View style={styles.filterElectricChargePoint}>
			<Button 
				title="Electric Charge Point" 
				onPress={() => {
					setElectricChargePoint(!filterElectricChargePoint)
					props.getCarParks(null, {
						filterParkAndRide,
						filterElectricChargePoint: !filterElectricChargePoint,
					});
				}}
				color={ filterElectricChargePoint ? '#2196F3' : '#8fcaf9'}
				accessibilityLabel="Filter by Electric Charge Point"
				 />
		</View>
	</View>)
}
const styles = StyleSheet.create({
  filterTitle: {
    paddingLeft: 10, 
    paddingBottom: 3, 
    fontWeight: 'bold'
  },
  filters: {
    flexDirection: 'row',
  },
  filterParkAndRide: {
    padding: 10,
    flex: 2
  },
  filterElectricChargePoint: {
    padding: 10,
    flex: 3
  }
});