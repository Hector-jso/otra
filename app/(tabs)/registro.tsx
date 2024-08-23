// Pantalla de Login
import React, { useState } from 'react';
import { StyleSheet, Pressable, View, Text, TextInput, Button, Alert,ImageBackground, Image } from 'react-native';
import axios from 'axios';
import config from '@/config';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const RegistroScreen = () => {
    
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [rango, setRango] = useState('');
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState('Cabo'); // Valor predeterminado

  const handleRegister = async () => {
    if (contraseña !== confirmarContraseña) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post(`http://${config.ipApi}:3000/api/register`, {
        nombre,
        contraseña,
        rango,
      });
      
      Alert.alert('Éxito', response.data.message);
      router.push('/'); // Navegar a la pantalla de login después del registro
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario');
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
        <View style={styles.fondo}>
            <ImageBackground source={require('../../assets/images/fondo.png')} 
            style={styles.imag}>
            <View style={styles.logo}>
                <Image source={require('../../assets/images/logo.png')}
                style={styles.logo_img}/>
                <Text style={styles.logo_text}>Zona Militar</Text>
            </View>
            </ImageBackground>
        </View>
        <View style={styles.cosas}>
        <Text style={styles.text}>Registro</Text>
        <TextInput style={styles.input} placeholderTextColor="#019063" placeholder="Nombre" value={nombre} onChangeText={setNombre}/>
        <TextInput style={styles.input} placeholderTextColor="#019063" placeholder="Contraseña" value={contraseña} secureTextEntry onChangeText={setContraseña}/>
        <TextInput style={styles.input} placeholderTextColor="#019063" placeholder="Confirmar Contraseña" value={confirmarContraseña} secureTextEntry onChangeText={setConfirmarContraseña}/>
        {/* <TextInput style={styles.input} placeholderTextColor="#019063" placeholder="Rango" value={rango} onChangeText={setRango}/> */}
        <Picker selectedValue={rango} style={styles.input} onValueChange={((itemValue) => setRango(itemValue))}>
            <Picker.Item label="Cabo" value="Cabo" />
            <Picker.Item label="Sargento" value="Sargento" />
            <Picker.Item label="Teniente" value="Teniente" />
        </Picker>
        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Crear</Text>
        </Pressable>
        <Pressable style={styles.buttonSis} onPress={() => router.push('/')}>
          <Text style={styles.buttonTextSis}>Ya tienes cuenta</Text>
        </Pressable>
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
  fondo: {
      backgroundColor: '#023D2A',
      alignContent: 'flex-start',
      position: 'absolute',
      top: 0,  
      height: 325,
      width: '100%',
  },
  cosas: {
      top: 325,
      width: '100%',
      alignItems: 'center',
  },
  imag: {
      height: '100%',
  }, 
  logo: {
      top: 10,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
  },
  logo_img:{
    width: '50%',
    height: '68%',
  },
  logo_text:{
    marginTop:"2%",
    color: '#FFFFFF',
    fontSize: 50,
    fontFamily:'Militar'
  },
  text:{
    top: 30,
    marginBottom: 50,
    color: '#FFFFFF',
    fontFamily:'Militar',
    fontSize: 34,
  },
    input:{
    alignItems: 'center',
    backgroundColor: '#2E3533',
    margin: 10,
    padding: 10,
    width: '75%',
    height: '8%',
    fontSize: 18,
    color: '#019063',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#019063',
    marginTop: 50,
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
  buttonSis: {
    // backgroundColor: '#019063',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '50%',
    borderColor: '#ffffff',
  borderBottomWidth: 2,
  },
  buttonTextSis: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Militar',
  },

});

export default RegistroScreen;
