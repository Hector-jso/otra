import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, Image, Pressable } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import config from '@/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MilitaresScreen = () => {
    const [militares, setMilitares] = useState([]);

    const fetchMilitares = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get(`http://${config.ipApi}:3000/api/militares`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMilitares(response.data);
        } catch (error) {
            console.error('Error al obtener militares:', error);
        }
    };
 
    useFocusEffect(
        useCallback(() => {
            fetchMilitares();
        }, [])
    );


    return (
        <View style={styles.container}>
            <View style={styles.cosas}>
                <Text style={styles.titulo}>Cosas</Text>
                <FlatList
                data={militares}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.nombre}>{item.nombre}</Text>
                        <Text style={styles.estado}>{item.estado}</Text>
                        <Text style={styles.informacion}>{item.informacion}</Text>
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
    cosas:{
        top: 145,
        margin: 10,
        width: '100%',
        height: '100%',
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
    item: {
        marginBottom: 20,
        height: 'auto',
        width: 350,
        padding: 15,
        backgroundColor: '#2E3533',
        borderRadius: 5,
    },
    titulo:{
        marginBottom: 20,
        color: '#FFFFFF',
        fontFamily:'Militar_ExtraBold',
        fontSize: 36,
    },
    nombre: {
        fontFamily:'Militar',
        fontSize: 18,
        marginTop: 5,
        color: '#ffffff'
    },
    estado: {
        fontSize: 14,
        marginTop: 5,
        color: '#ffffff'
    },
    informacion: {
        fontSize: 16,
        marginTop: 5,
        color: '#ffffff'
    },
});

export default MilitaresScreen;
