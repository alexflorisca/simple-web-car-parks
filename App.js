import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { API_KEY } from '@env'

export default function App() {
  const [carParks, setCarParks] = useState([]);

  const getCarParks = () => {
    if(!API_URL || !API_KEY) {
      throw new Error('Missing API_URL or API_KEY');
    }

    fetch(API_URL, {
      headers: {
        'accept': 'application/json',
        'x-api-key': API_KEY
      }
    })
    .then(response => response.json())
    .then(results => setCarParks(results))
    .catch(error => console.error(error));
  }

  useEffect(() => {
    getCarParks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Parks</Text>
      <FlatList data={carParks.data} renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}>

      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    padding: 10,
    fontWeight: "bold"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});
