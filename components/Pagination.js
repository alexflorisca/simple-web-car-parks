import React from 'react';
import {
  FlatList,
  Pressable,
	StyleSheet,
  Text,
  View
} from 'react-native';
import { decode } from 'html-entities';


export default function Pagination(props) {
  const { isLoading, isError, pageLinks, getCarParks } = props;
		
	if(isLoading || isError || !pageLinks) {
    return null;
  }
  return <FlatList
    keyExtractor={item => item.label.toString()}
    horizontal
    data={pageLinks}
    renderItem={({ item }) => (
      <Pressable style={styles.pageItem} onPress={() => item.url !== null && getCarParks(item.url)}>
        <Text accessibilityLabel={`Page ${decode(item.label)}`}>{decode(item.label)}</Text>
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
  </FlatList>
}
const styles = StyleSheet.create({
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
  }
});