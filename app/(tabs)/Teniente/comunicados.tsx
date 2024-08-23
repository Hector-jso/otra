import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, Image, Pressable } from 'react-native';
import axios from 'axios';
import config from '@/config';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ComunicadosScreen = () => {
    const router = useRouter();
    const [comunicados, setComunicados] = useState([]);

    const fetchComunicados = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`http://${config.ipApi}:3000/api/comunicados`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setComunicados(response.data);
        } catch (error) {
            console.error('Error al obtener comunicados:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchComunicados();
        }, [])
      );

    return (
        <View style={styles.container}>
            <View style={styles.cosas}>
            <Pressable style={styles.button} onPress={() => router.push('/Teniente/crearComunicado')}>
                <Text style={styles.buttonText}>Crear</Text>
            </Pressable>
            <Text style={styles.titulo}>Comunicados</Text>
                <FlatList
                data={comunicados}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        {/* <Text style={styles.fecha}>{item.fecha}</Text> */}
                        <Text style={styles.mensaje}>{item.mensaje}</Text>
                    </View>
                )}
                />
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
        alignItems: 'center',
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
    item: {
      marginBottom: 20,
      height: 'auto',
      width: 350,
      padding: 15,
      backgroundColor: '#2E3533',
        borderRadius: 5,
    },
    fecha: {
        fontSize: 14,
        color: '#888',
    },
    mensaje: {
        fontSize: 18,
        marginTop: 5,
        color: '#ffffff'
    },
    cosas:{
        top: 125,
        margin: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
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
});

export default ComunicadosScreen;
