import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { API_URL, API_KEY } from '@env'
import { decode } from 'html-entities';

export default function App() {
  const [carParks, setCarParks] = useState([]);
  const [pageLinks, setPageLinks] = useState([]);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);


  const onPagePress = (item) => {
    getCarParks(item.url);
  }

  const getCarParks = (url) => {
    console.log(url);
    if(!API_URL || !API_KEY) {
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
      setCarParks(results.data);
      setPageLinks(results.links);
    })
    .catch(error => setError(true))
    .finally(() => setLoading(false));
  }

  useEffect(() => {
    getCarParks(API_URL);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Parks</Text>
      { isLoading && <ActivityIndicator />}
      <FlatList 
        keyExtractor={item => item.id} 
        data={carParks} 
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}>
      </FlatList>
      <FlatList 
        keyExtractor={item => item.id}
        horizontal 
        data={pageLinks} 
        renderItem={({ item }) => (
          <Pressable style={styles.pagination} onPress={() => getCarParks(item.url)}>
            <Text>{decode(item.label)}</Text>
          </Pressable>
        )}
        ItemSeparatorComponent={
        (({ highlighted }) => (
          <View
            style={[
              styles.separator,
              highlighted && { marginLeft: 0 }
            ]}
          />
        ))}>
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
  },
  separator: {
    marginLeft: 3,
    marginRight: 3
  },
  pagination: {

  }
});
