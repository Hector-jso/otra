// app/create.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground, Image} from 'react-native';
import axios from 'axios';
import config from '@/config';
import { useRouter } from 'expo-router';

const CreateScreen = () => {
  const router = useRouter();
  const [nombre, setNombre] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post(`http://${config.ipApi}:3000/api/items`, { Nombre: nombre });
      Alert.alert('Success', 'Item created successfully');
      router.push('/'); // Navega de vuelta a la pantalla de inicio
    } catch (error) {
      Alert.alert('Error', 'Failed to create item');
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.topbar}>
        <ImageBackground source={require('../../../assets/images/fondo.png')} 
        style={styles.fondo}>
        <View>
            <Image source={require('../../../assets/images/logo.png')}
            style={styles.logo_img}/>
            <Text style={styles.logo_text}>Zona Militar</Text>
        </View>
        </ImageBackground>
      </View>
      <Text style={styles.text}>Create Item</Text>
      <TextInput style={styles.input} placeholderTextColor="#019063" value={nombre} onChangeText={setNombre} placeholder="Enter name" />
      <Button title="Create" onPress={handleSubmit} />
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#202523',
      justifyContent: 'center',
      alignItems: 'center',
    },
    //---------------
    topbar:{
      backgroundColor: '#023D2A',
      alignContent: 'flex-start',
      position: 'absolute',
      top: 0,  
      height: '15%',
      width: '100%',
    },
    fondo:{
      height: '100%',
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
    //------------------
    text:{
      color: '#FFFFFF',
      fontSize: 34,
      fontFamily:'Militar_ExtraBold'
    },
    input:{
        alignItems: 'center',
        backgroundColor: '#2E3533',
        margin: 12,
        padding: 10,
        width: '50%',
        height: '8%',
        fontSize: 18,
        color: '#019063',
        borderRadius: 5,

    }
  });
  

export default CreateScreen;
