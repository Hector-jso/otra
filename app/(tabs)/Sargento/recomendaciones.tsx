import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import config from '@/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const SincronizacionScreen = () => {
    const [recomendaciones, setRecomendaciones] = useState([]);
    const [comunicados, setComunicados] = useState([]);

    const sincronizarDatos = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            await axios.post(
                `http://${config.ipApi}:3000/api/sincronizar-datos`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchRecomendaciones();
            fetchComunicados();
        } catch (error) {
            console.error('Error al sincronizar datos:', error);
        }
    };

    const fetchRecomendaciones = async () => {
        try {
            const response = await axios.get(`http://${config.ipApi}:3000/api/recomendaciones`);
            setRecomendaciones(response.data);
        } catch (error) {
            console.error('Error al obtener recomendaciones:', error);
        }
    };

    const fetchComunicados = async () => {
        try {
            const response = await axios.get(`http://${config.ipApi}:3000/api/comunicados`);
            setComunicados(response.data);
        } catch (error) {
            console.error('Error al obtener comunicados:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchRecomendaciones();
            fetchComunicados();
        }, [])
      );


    return (
        <View style={styles.container}>
            <Button title="Sincronizar Datos" onPress={sincronizarDatos} />
            <Text style={styles.title}>Recomendaciones</Text>
            <FlatList
                data={recomendaciones}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title}>{item.titulo}</Text>
                        <Text>{item.descripcion}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
            <Text style={styles.title}>Comunicados</Text>
            <FlatList
                data={comunicados}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.mensaje}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        marginVertical: 10,
    },
    item: {
        marginVertical: 10,
    },
});

export default SincronizacionScreen;
