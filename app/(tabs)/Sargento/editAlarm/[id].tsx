import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, Alert, Pressable, StyleSheet, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import config from '@/config';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

const EditScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Obtén el parámetro `id` de la URL
  const [Nombre, setNombre] = useState('');
  const [Hora, setHora] = useState('');
  const [Min, setMin] = useState('');
  const [Seg, setSeg] = useState('');

  useFocusEffect(
    useCallback(() => {
      const fetchItem = async () => {
        try {
          const response = await axios.get(`http://${config.ipApi}:3000/api/alarm/${id}`);
          setNombre(response.data.nombre);
          setHora(response.data.hora);
          setMin(response.data.min);
          setSeg(response.data.seg);
        } catch (error) {
          Alert.alert('Error', 'Failed to fetch item');
        }
      };
      if (id) {
        fetchItem();
      }
    }, [id])
  );

  const handleSubmit = async () => {
    try {
      await axios.put(`http://${config.ipApi}:3000/api/alarm/${id}`, { nombre: Nombre, hora: Hora, min: Min, seg: Seg  });
      Alert.alert('Success', 'Item updated successfully');
      router.push('/Sargento'); // Navega de vuelta a la pantalla de inicio
    } catch (error) {
      Alert.alert('Error', 'Failed to update item');
    }
  };

  return (
    <View style={styles.todo}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Editar Alarma</Text>
        <Pressable style={styles.regresar} onPress={() => router.push('Sargento/')}>
          <Text style={styles.buttonText}>Regresar</Text>
        </Pressable>
        <View style={styles.form}>
          <Text style={styles.text}>Nombre</Text>
          <TextInput style={styles.input} placeholderTextColor="#019063" value={Nombre} onChangeText={setNombre} placeholder="Ingresa un nombre/titulo" />
          <Text style={styles.text}>Hora</Text>
          <TextInput style={styles.input} placeholderTextColor="#019063" value={Hora} onChangeText={setHora} keyboardType="numeric" maxLength={2}  placeholder="Ingresa las hora" />
          <Text style={styles.text}>Minutos</Text>
          <TextInput style={styles.input} placeholderTextColor="#019063" keyboardType="numeric" maxLength={2} value={Min} onChangeText={setMin} placeholder="Ingresa los minutos" />
          <Text style={styles.text}>Segundos</Text>
          <TextInput style={styles.input} placeholderTextColor="#019063" keyboardType="numeric" maxLength={2} value={Seg} onChangeText={setSeg} placeholder="Ingresa los segundos" />
        </View>
        {/* <Button title="Create" onPress={handleSubmit} /> */}
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Crear</Text>
        </Pressable>
      </View>
      <View style={styles.topbar}>
        <ImageBackground source={require('../../../../assets/images/fondo.png')} 
        style={styles.fondo}>
          <View>
            <Image source={require('../../../../assets/images/logo.png')}
            style={styles.logo_img}/>
            <Text style={styles.logo_text}>Zona Militar</Text>
          </View>
          <View style={styles.divisa}>
            <Image source={require('../../../../assets/images/Sargento.png')}
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
  form:{
    marginTop:"2%",
    height:'75%',
    width: '90%',
    alignItems: 'center',
  },
  //------------------
  titulo:{
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
    height: '10%',
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
    bottom: '15%',
    backgroundColor: '#019063',
    alignItems: 'center',
    borderRadius: 5,
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

export default EditScreen;
