import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { API_URL, API_KEY } from '@env'
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import CarParksList from './components/CarParksList';

export default function App() {
  const [carParks, setCarParks] = useState([]);
  const [pageLinks, setPageLinks] = useState([]);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  function getCarParksApiUrl({
    filterParkAndRide, 
    filterElectricChargePoint
  }) {
      let url = `${API_URL}?page=1`
      if(filterElectricChargePoint) {
        url += `&filters%5Belectric_car_charge_point%5D=true`;
      }
      if(filterParkAndRide) {
        url += `&filters%5Bpark_and_ride%5D=true`;
      }

      return url;
  }

  function getCarParks(url, filters) {
    if (!API_URL || !API_KEY) {
      throw new Error('Missing API_URL or API_KEY');
    }

    setLoading(true);
    setError(false);

    url = url ? url : getCarParksApiUrl(filters);

    fetch(url, {
      headers: {
        'accept': 'application/json',
        'x-api-key': API_KEY
      }
    })
      .then(response => response.json())
      .then(results => {
        setCarParks(results.data);
        setPageLinks(results.links);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getCarParks(API_URL);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Parks</Text>
      <Text style={styles.filterTitle}>Filter by:</Text>
      <Filters getCarParks={getCarParks} />
      <CarParksList isLoading={isLoading} isError={isError} carParks={carParks} />
      <Pagination isLoading={isLoading} isError={isError} pageLinks={pageLinks} getCarParks={getCarParks} />
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
});
