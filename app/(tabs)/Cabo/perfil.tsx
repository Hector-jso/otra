import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '@/config';
import axios from 'axios';
import { useRouter } from 'expo-router';

const UserProfileScreen = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await axios.get(`http://${config.ipApi}:3000/api/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'No se pudo obtener la información del usuario.');
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('rango');
      router.push('../../'); // Redirige a la pantalla de login
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo cerrar sesión.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cosas}>
        {user ? (
          <>
            <View style={styles.divisa}>
              <Image source={require('../../../assets/images/Cabo.png')}
                style={styles.divisas}/>
            </View>
            <Text style={styles.text}>Nombre: {user.nombre}</Text>
            <Text style={styles.text}>Rango: {user.rango}</Text>
            <Pressable style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Cerrar Sesión</Text>
            </Pressable>
          </>
        ) : (
          <Text style={styles.text}>Cargando...</Text>
        )}
      </View>
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
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202523',
    justifyContent: 'flex-start',
  },
  //---------------------
  topbar:{
    backgroundColor: '#023D2A',
    alignContent: 'flex-start',
    position: 'absolute',
    top: 0,  
    height: 125,
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
  divisa:{
    margin: '7%',
    width: '30%',
    height: '40%',
  },
  divisas:{
    width: '100%',
    height: '100%',
  },
  //-------------------
  cosas:{
    top: 125,
    margin: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontFamily:'Militar',
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#019063',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default UserProfileScreen;
