import React from 'react';
import { useState } from "react";
import MapView, { Marker , Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import * as Location from 'expo-location';


export default function App() {
  
  const [origin, setOrigin] = React.useState({
    latitude: 24.02238,
    longitude: -104.55386,
  });
  
  const [destination, setDestination] = React.useState ({
    latitude: 24.12238,
    longitude: -104.55386,
  });
  
  React.useEffect(() => {
    getLocationPermission();
  }, [])
  
  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      alert('permission denid');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }
    setOrigin(current);
  }
  
  const [ubi, setUbi] = React.useState({
    latitude: origin.latitude,
    longitude: origin.longitude,
  });
  
  const [currentRegion, setCurrentRegion] = useState(origin);
  
  const handleRegionChangeComplete = (region:any) => {
    setCurrentRegion(region);
  };
  return (

    <View style={styles.container}>
      <View style={styles.mapa}>
        <MapView 
        style={styles.map}
        initialRegion={{
          latitude: ubi.latitude,
          longitude: ubi.longitude,
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
          <Marker 
            draggable
            coordinate={destination}
            onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
            />
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={'AIzaSyCVBhHJEoun4qQggBxyF8auBN--wRHyFR0'}
            strokeColor= "pink"
            strokeWidth={8}
          />
          {/* <Polyline 
            coordinates={[origin,destination]}
            /> */}
        </MapView>
        <View style={styles.info}>
          <Text style={styles.texto}>Región actual:</Text>
          <Text style={styles.texto}>Latitude: {currentRegion.latitude}</Text>
          <Text style={styles.texto}>Longitude: {currentRegion.longitude}</Text>
        </View>
        {/* <View style={styles.sis}></View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202523',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapa: {
    flex: 1,
    top: '15%',
    marginTop: '5%',
    marginBottom: '5%',
    width: '80%',
    height: '70%',
    justifyContent: 'center',
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
    flex: 1,
    width: '100%',
    height: '100%',
    
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
  // overlay: {
  //   ...StyleSheet.absoluteFillObject,  // Cubre todo el ImageBackground
  //   backgroundColor: '#023D2A',
  //   opacity: 0.5,  // Nivel de opacidad
  // },
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
});
