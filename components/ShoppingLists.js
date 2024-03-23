import { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';

import { collection, getDocs } from 'firebase/firestore';

const ShoppingLists = ({ db }) => {

  const [lists, setLists] = useState([]);

  const fetchShoppingLists = async () => {
    const listsDouments = await getDocs(collection(db, "shoppinglists"));
    let newLists = [];
    listsDouments.forEach(docObject => {
      newLists.push({ id: docObject.id, ...docObject.data() })
    });
    setLists(newLists)
  }

  useEffect (() => {
    fetchShoppingLists();
  }, [JSON.stringify(lists)]);

  return(
    <View style={styles.container}>
      <FlatList
        data={lists}
        renderItem={({ item }) =>
          <Text>{item.name}: {item.items.join(", ")}</Text>}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});




export default ShoppingLists;