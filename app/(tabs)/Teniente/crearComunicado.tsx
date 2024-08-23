import React, { useState } from 'react';
import { View, Pressable, ImageBackground, Image, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import config from '@/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const AgregarComunicadoScreen = () => {
    const [mensaje, setMensaje] = useState('');
    const [fecha, setFecha] = useState('');

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.post(
                `http://${config.ipApi}:3000/api/agregar-comunicado`,
                { mensaje, fecha },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            Alert.alert('Éxito', 'Comunicado agregado correctamente');
            router.push('/Teniente/comunicados');
        } catch (error) {
            Alert.alert('Error', 'Error al agregar comunicado');
            console.error('Error al agregar comunicado:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.cosas}>
                <Text style={styles.label}>Mensaje</Text>
                <TextInput
                    style={styles.input}
                    value={mensaje}
                    placeholderTextColor="#019063"
                    onChangeText={setMensaje}
                    multiline
                    />
                <Text style={styles.label}>Fecha</Text>
                <TextInput
                    style={styles.input}
                    value={fecha}
                    placeholderTextColor="#019063"
                    onChangeText={setFecha}
                    placeholder="YYYY-MM-DD"
                    />
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Agregar Comunicado</Text>
                </Pressable>
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202523',
        // justifyContent: 'center',
        // alignItems: 'center',
      },
    //____________________
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
    //____________________
    titulo:{
        marginBottom: 20,
        color: '#FFFFFF',
        fontFamily:'Militar_ExtraBold',
        fontSize: 36,
      },
    cosas:{
        top: 225,
        padding: 10,
        alignItems: 'center',
      },
    label: {
        color: '#ffffff',
        fontSize: 16,
        marginVertical: 10,
    },
    input: {
        backgroundColor: '#2E3533',
        color: '#019063',
        height: 'auto',
        padding: 10,
        borderRadius: 5,
        width: 300,
    },
    buttonText: {
        fontSize: 26,
        color: '#FFFFFF',
        fontFamily: 'Militar',
      },
      button: {
        top: 100,
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
      }
});

export default AgregarComunicadoScreen;
