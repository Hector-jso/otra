import React, { useState, useCallback } from "react";
import { StyleSheet, Pressable, Alert, View, Text, Image, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import config from '@/config';

const Map = () => {  
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const [Nombre, setNombre] = useState('');
  const [Latitud, setLatitud] = useState(0.0);
  const [Longitud, setLongitud] = useState(0.0);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);


  const [origin, setOrigin] = useState({
    latitude: Latitud,
    longitude: Longitud,
  });
  const [ubi, setUbi] = useState({
    latitude: Latitud,
    longitude: Longitud,
  });

  React.useEffect(() => {
    getLocationPermission();
  }, []);

  async function getLocationPermission() {
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
    setUbi(current);
  }

  const [currentRegion, setCurrentRegion] = useState(origin);

  useFocusEffect(
    useCallback(() => {
      const fetchItem = async () => {
        try {
          const response = await axios.get(`http://${config.ipApi}:3000/api/map/${id}`);
          if (response && response.data) {
            setNombre(response.data.nombre);
            setLatitud(response.data.latitud);
            setLongitud(response.data.longitud);
            setOrigin({
              latitude: response.data.latitud,
              longitude: response.data.longitud,
            });
          }
        } catch (error) {
          Alert.alert('Error', 'Failed to fetch item');
        } finally {
          setIsLoading(false);
        }
      };

      if (id) {
        fetchItem();
      }
    }, [id])
  );

  const handleRegionChangeComplete = (region:any) => {
    setCurrentRegion(region);
  };

  if (isLoading) {
    return (
      <View style={styles.todo}>
        <View style={styles.container}></View>
        <View style={styles.topbar}>
          <ImageBackground source={require('../../../../assets/images/fondo.png')} 
            style={styles.fondo}>
            <View>
              <Image source={require('../../../../assets/images/logo.png')} style={styles.logo_img} />
              <Text style={styles.logo_text}>Zona Militar</Text>
            </View>
            <View style={styles.divisa}>
              <Image source={require('../../../../assets/images/Cabo.png')}
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
        <Text style={styles.titulo}>Incurcion</Text>
        <Text style={styles.titulo}>{Nombre}</Text>
        <View style={styles.mapa}>
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
              coordinate={ubi}
              onDragEnd={(direction) => setUbi(direction.nativeEvent.coordinate)}
            />
            <Marker 
              draggable
              coordinate={origin}
              onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
            />
            <MapViewDirections
              origin={ubi}
              destination={origin}
              apikey={config.apiKey}
              strokeColor="#019063"
              strokeWidth={6}
              onReady={result => {
                setDistance(result.distance);
                setDuration(result.duration);
              }}
            />
          </MapView>
          <View>
            <Text style={styles.texto}>Distancia: {distance.toFixed(2)} km</Text>
            <Text style={styles.texto}>Tiempo: {Math.round(duration)} min</Text> 
          </View>
          <Pressable style={styles.button} onPress={() => router.push('Cabo/mapas')}>
            <Text style={styles.buttonText}>Listo</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.topbar}>
        <ImageBackground source={require('../../../../assets/images/fondo.png')} 
          style={styles.fondo}>
          <View>
            <Image source={require('../../../../assets/images/logo.png')} style={styles.logo_img} />
            <Text style={styles.logo_text}>Zona Militar</Text>
          </View>
          <View style={styles.divisa}>
            <Image source={require('../../../../assets/images/Cabo.png')}
            style={styles.divisas}/>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

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
    marginTop: '5%',
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
    fontSize:36,
    color: '#FFFFFF',
    fontFamily:'Militar',
  },
  button: {
    // bottom: '15%',
    backgroundColor: '#019063',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    height: 50,
    width: '50%',
  },
  regresar: {
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: '#908E01',
    alignItems: 'center',
    borderRadius: 5,
    width: '26%',
  },
});
export default Map;