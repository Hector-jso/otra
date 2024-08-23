import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, Pressable, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import config from '@/config';
import { useRouter, useLocalSearchParams } from 'expo-router';

const EditScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Obtén el parámetro `id` de la URL
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://${config.ipApi}:3000/api/items/${id}`);
        setNombre(response.data.Nombre);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch item');
      }
    };
    if (id) {
      fetchItem();
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      await axios.put(`http://${config.ipApi}:3000/api/items/${id}`, { Nombre: nombre });
      Alert.alert('Success', 'Item updated successfully');
      router.push('/'); // Navega de vuelta a la pantalla de inicio
    } catch (error) {
      Alert.alert('Error', 'Failed to update item');
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.topbar}>
            <ImageBackground source={require('../../../../assets/images/fondo.png')} 
            style={styles.fondo}>
            <View>
                <Image source={require('../../../../assets/images/logo.png')}
                style={styles.logo_img}/>
                <Text style={styles.logo_text}>Zona Militar</Text>
            </View>
            </ImageBackground>
        </View>
        <View style={styles.cosas}>
            <Text style={styles.text}>Edit Item</Text>
            <TextInput style={styles.input} placeholderTextColor="#019063" value={nombre} onChangeText={setNombre} placeholder="Enter name" />
            <Button title="Update" onPress={handleSubmit} />
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#202523',
      justifyContent: 'flex-start',
      },
    //--------------
    topbar:{
      backgroundColor: '#023D2A',
      alignContent: 'flex-start',
      position: 'absolute',
      top: 0,  
      height: '15%',
      width: '100%',
    },
    fondo:{
      top: 0,
      height: '100%',
      width: '100%',
      position: 'absolute',
    },
    logo_img:{
      left: '2%',
      marginTop: '7%',
      paddingTop: '17%',
      paddingRight: '15%',
      width: '10%',
      height: '10%',
    },
    logo_text:{
      left: '2%',
      marginTop:"2%",
      color: '#FFFFFF',
      fontFamily:'Militar'
    },
    //--------------------
    cosas:{
      top: '15%',
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text:{
      color: '#FFFFFF',
      fontFamily:'Militar',
      fontSize: 24,
    },
    text_button:{
      color: '#FFFFFF',
      fontFamily:'Militar',
      fontSize: 20,
      marginRight: 10,
    },
    button: {
      backgroundColor: '#019063',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      width: '50%',
    },
    buttonText:{
      fontSize: 26,
      color: '#FFFFFF',
      fontFamily:'Militar',
    },
    input:{
        alignItems: 'center',
        backgroundColor: '#2E3533',
        margin: 12,
        padding: 10,
        width: '50%',
        height: '20%',
        fontSize: 18,
        color: '#019063',
        borderRadius: 5,
        fontWeight: '100',
    }
  });

export default EditScreen;
