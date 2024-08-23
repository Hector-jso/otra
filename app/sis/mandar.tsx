import { useState } from 'react';

import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import React from 'react';

export default function mandar () {
  const [Nombre, setNombre] = useState('');
  const [error, setError] = useState(null);

  const addItem = async () => {
    try {
      const response = await axios.post('http://192.168.1.233:3000/api/items', {
        //aqui los datos
        Nombre 
      });
      Alert.alert('Item agregado', `ID: ${response.data.insertId}`);
      setNombre('');
    } catch (error: any) {
      setError(error?.message );
      console.error('Error adding item:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Item:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={Nombre}
        onChangeText={setNombre}
      />
      <Button title="Agregar" onPress={addItem} />
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    color: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
});

