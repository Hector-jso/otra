import React from 'react';
import { useState, useEffect } from "react";
import MapView, { Marker , Polyline } from 'react-native-maps';
import { StyleSheet, Pressable, Alert, View, Text, TextInput, Image, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import config from '@/config';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

const CreateScreen = () => {  
  const router = useRouter();
  const [Nombre, setNombre] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Estado para la pantalla de carga
  const [origin, setOrigin] = useState({
    latitude: 24.02238,
    longitude: -104.55386,
  });

  const [currentRegion, setCurrentRegion] = useState(origin);

  const handleSubmit = async () => {
    try {
      await axios.post(`http://${config.ipApi}:3000/api/map`, { nombre: Nombre, latitud: origin.latitude, longitud: origin.longitude });
      Alert.alert('Success', 'Item created successfully');
      router.push('/Teniente'); // Navega de vuelta a la pantalla de inicio
    } catch (error) {
      Alert.alert('Error', 'Failed to create item');
      console.log(error);
    }
  };

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const current = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setOrigin(current);
    } catch (error) {
      Alert.alert('Error', 'Failed to get location');
    } finally {
      setIsLoading(false); // Oculta la pantalla de carga cuando finaliza la solicitud de ubicación
    }
  };

  const handleRegionChangeComplete = (region:any) => {
    setCurrentRegion(region);
  }

  if (isLoading) {
    // Renderiza la pantalla de carga
    return (
      <View style={styles.todo}>
        <View style={styles.container}>
        </View>
        <View style={styles.topbar}>
          <ImageBackground source={require('../../../assets/images/fondo.png')} 
          style={styles.fondo}>
          <View>
            <Image source={require('../../../assets/images/logo.png')}
            style={styles.logo_img}/>
            <Text style={styles.logo_text}>Zona Militar</Text>
          </View>
          <View style={styles.divisa}>
            <Image source={require('../../../assets/images/Teniente.png')}
            style={styles.divisas}/>
        </View>
        </ImageBackground>
      </View>
    </View>
    );
  }

  return (
    <View style={styles.todo}>
      <View style={styles.container}>
        <View style={styles.mapa}>
          <Pressable style={styles.regresar} onPress={() => router.push('Teniente/mapas')}>
            <Text style={styles.buttonText}>Regresar</Text>
          </Pressable>
          <Text style={styles.titulo}>Crear Ubicacion</Text>
          <MapView 
          style={styles.map}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            longitudeDelta: 0.03,
            latitudeDelta: 0.01,
          }}
          onRegionChangeComplete={handleRegionChangeComplete}
          >
            <Marker 
              draggable
              coordinate={origin}
              onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
              />
          </MapView>
          <Text style={styles.text}>Nombre de la Incurcion</Text>
          <TextInput style={styles.input} placeholderTextColor="#019063" value={Nombre} onChangeText={setNombre} placeholder="ingresa el nombre" />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Crear</Text>
          </Pressable>
          {/* <View style={styles.info}>
            <Text style={styles.texto}>Región actual:</Text>
            <Text style={styles.texto}>Latitude: {currentRegion.latitude}</Text>
            <Text style={styles.texto}>Longitude: {currentRegion.longitude}</Text>
            </View> */}
          {/* <View style={styles.sis}></View> */}
        </View>
      </View>
      
      <View style={styles.topbar}>
        <ImageBackground source={require('../../../assets/images/fondo.png')} 
        style={styles.fondo}>
          <View>
            <Image source={require('../../../assets/images/logo.png')}
            style={styles.logo_img}/>
            <Text style={styles.logo_text}>Zona Militar</Text>
          </View>
          <View style={styles.divisa}>
            <Image source={require('../../../assets/images/Teniente.png')}
            style={styles.divisas}/>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  todo:{
    flex: 1,
  },
  container: {
    flex: 1,
    top: 125,
    backgroundColor: '#202523',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapa: {
    flex: 1,
    marginTop: '5%',
    marginBottom: '5%',
    width: '80%',
    alignItems: 'center',
  },
  sis:{
    margin: 10,
    flex: 1,
    position: 'absolute',
    width: '105%',
    height: '102%',
    borderRadius: 20,
    borderWidth: 10,
    borderColor: '#202523',
    
  },
  map: {
    width: '100%',
    height: '60%',
    
  },
  info: {
    padding: 10,
    position: 'absolute',
    backgroundColor: "#202523",
    bottom: 20,
    // left: "5%",
    width: "60%",
    borderRadius: 20,
  },
  texto:{
    color: '#ffffff'
  },
  //---------------
  topbar:{
    flex: 1,
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
    position: 'absolute',
    right: '2%',
    top: 0,
    marginTop: '7%',
    width: '12%',
    height: '70%',
  },
  divisas:{
    width: '100%',
    height: '100%',
  },
   //------------------
  titulo:{
    marginTop: '3%',
    marginBottom: '10%',
    color: '#FFFFFF',
    fontFamily:'Militar_ExtraBold',
    fontSize: 36,
  },
  text:{
    color: '#FFFFFF',
    fontSize: 28,
    fontFamily:'Militar_ExtraBold'
  },
  input:{
    alignItems: 'center',
    backgroundColor: '#2E3533',
    margin: 12,
    padding: 10,
    width: '50%',
    height: '5%',
    fontSize: 18,
    color: '#019063',
    borderRadius: 5,
  },
  buttonText:{
    fontSize: 26,
    color: '#FFFFFF',
    fontFamily:'Militar',
  },
  button: {
    // bottom: '15%',
    backgroundColor: '#019063',
    alignItems: 'center',
    borderRadius: 5,
    width: '50%',
  },
  regresar: {
    position: 'absolute',
    left: -20,
    top: -16,
    backgroundColor: '#908E01',
    alignItems: 'center',
    borderRadius: 5,
    width: '32%',
  },
});

export default CreateScreen;