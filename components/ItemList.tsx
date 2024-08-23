import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import axios from 'axios';

interface Item {
  id: number;
  name: string;
  // otros campos según tu base de datos
}

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://192.168.1.233:3000/api/items');
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.text}>{item.name}</Text>
            {/* otros campos */}
            <Button title="Editar" onPress={() => {/* lógica para editar */}} />
            <Button title="Eliminar" onPress={() => {/* lógica para eliminar */}} />
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: '#FFFFFF',
    fontFamily:'Militar',
    fontSize: 24,
  },
})

export default ItemList;
