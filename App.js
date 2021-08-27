import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { API_URL, API_KEY } from '@env'
import { decode } from 'html-entities';

export default function App() {
  const [carParks, setCarParks] = useState([]);
  const [pageLinks, setPageLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [filterParkAndRide, setParkAndRide] = useState(false);
  const [filterElectricChargePoint, setElectricChargePoint] = useState(false);


  function getCarParksApiUrl({ 
    filterParkAndRide, 
    filterElectricChargePoint
  }) {

      let url = `${API_URL}?page=1`
      if(filterElectricChargePoint) {
        url+= `&filters%5Belectric_car_charge_point%5D=true`;
      }
      if(filterParkAndRide) {
        url+= `&filters%5Bpark_and_ride%5D=true`;
      }

      return url;
  }

  function getCarParks(url) {
    setLoading(true);
    setError(false);
    if (!API_URL || !API_KEY) {
      throw new Error('Missing API_URL or API_KEY');
    }

    fetch(url, {
      headers: {
        'accept': 'application/json',
        'x-api-key': API_KEY
      }
    })
      .then(response => response.json())
      .then(results => {
        setCurrentPage(results.current_page);
        setCarParks(results.data);
        setPageLinks(results.links);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }

  function renderCarParks() {
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

  function renderPagination() {
    return (!isLoading && !isError && pageLinks && <FlatList
      keyExtractor={item => item.label.toString()}
      horizontal
      data={pageLinks}
      renderItem={({ item }) => (
        <Pressable style={styles.pageItem} onPress={() => item.url !== null && getCarParks(item.url)}>
          <Text>{decode(item.label)}</Text>
        </Pressable>
      )}
      style={styles.pagination}
      ItemSeparatorComponent={
        (({ highlighted }) => (
          <View
            style={[
              styles.separator,
              highlighted && { marginLeft: 0 }
            ]}
          />
        ))}>
    </FlatList>)
  }

  function renderFilters() {
    return (<View style={styles.filters}>
      <View style={styles.filterParkAndRide}>
        <Button 
          title="Park and Ride" 
          onPress={() => {
            const url = getCarParksApiUrl({ 
              filterParkAndRide: !filterParkAndRide,
              filterElectricChargePoint
            });
            setParkAndRide(!filterParkAndRide);
            getCarParks(url);
          }}
          color={ filterParkAndRide ? '#2196F3' : '#8fcaf9'}
           />
      </View>
      <View style={styles.filterElectricChargePoint}>
        <Button 
          title="Electric Charge Point" 
          onPress={() => {
            const url = getCarParksApiUrl({ 
              filterParkAndRide,
              filterElectricChargePoint: !filterElectricChargePoint,
            });
            setElectricChargePoint(!filterElectricChargePoint)
            getCarParks(url);
          }}
          color={ filterElectricChargePoint ? '#2196F3' : '#8fcaf9'}
           />
      </View>
    </View>)
  }


  useEffect(() => {
    getCarParks(API_URL);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Parks</Text>
      <Text style={styles.filterTitle}>Filter by:</Text>
      {renderFilters()}
      {renderCarParks()}
      {renderPagination()}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    padding: 10,
    fontWeight: "bold"
  },
  loading: {
    padding: 10
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  separator: {
    marginLeft: 3,
    marginRight: 3
  },
  pagination: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  pageItem: {
    padding: 2,
    marginBottom: 10
  },
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
