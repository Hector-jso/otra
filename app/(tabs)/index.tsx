import React, { useState } from 'react';
import { StyleSheet, Pressable, View, Text, TextInput, Alert, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import config from '@/config';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://${config.ipApi}:3000/api/login`, {
        nombre,
        contraseña,
      });
      
      const { token, user } = response.data; // Asegúrate de que el servidor envíe el rol del usuario en la respuesta
      const { rango } = user; // Extrae el rol del usuario
  
      // Almacena el token y el rol en AsyncStorage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('rango', rango);
  
      // Alert.alert('Success', 'Logged in successfully');
  
      // Redirige al usuario según su rol
      console.log(rango)
      if (rango === 'Cabo') {
        router.push('/Cabo/');
      } else if (rango === 'Sargento') {
        router.push('/Sargento/');
      } else if (rango === 'Teniente') {
        router.push('/Teniente');
      } else {
        router.push('/');
      }
      }catch (error:any) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else {
          console.error('Error message:', error.message);
        }
        Alert.alert('Error', 'Invalid credentials');
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.fondo}>
        <ImageBackground source={require('../../assets/images/fondo.png')} style={styles.imag}>
          <View style={styles.logo}>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo_img} />
            <Text style={styles.logo_text}>Zona Militar</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.cosas}>
        <Text style={styles.text}>Login</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#019063"
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#019063"
          placeholder="Contraseña"
          value={contraseña}
          secureTextEntry
          onChangeText={setContraseña}
        />
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
        <Pressable style={styles.buttonSis} onPress={() => router.push('/registro')}>
          <Text style={styles.buttonTextSis}>No tienes cuenta</Text>
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
  imag: {
    height: '100%',
  },
  logo: {
    top: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo_img: {
    width: '50%',
    height: '68%',
  },
  logo_text: {
    marginTop: "2%",
    color: '#FFFFFF',
    fontSize: 50,
    fontFamily: 'Militar',
  },
  cosas: {
    top: 325,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    top: 30,
    marginBottom: 50,
    color: '#FFFFFF',
    fontFamily: 'Militar',
    fontSize: 34,
  },
  input: {
    alignItems: 'center',
    backgroundColor: '#2E3533',
    margin: 12,
    padding: 10,
    width: '75%',
    height: '15%',
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
  buttonText: {
    fontSize: 26,
    color: '#FFFFFF',
    fontFamily: 'Militar',
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

export default LoginScreen;
