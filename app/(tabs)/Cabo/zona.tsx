import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const ZonaScreen = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.cosas}>
            <Text style={styles.titulo}>Zona</Text>
                <Pressable style={styles.button} onPress={() => router.push('/Cabo/militares')}>
                    <Text style={styles.buttonText}>Militares</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => router.push('/Cabo/comunicados')}>
                    <Text style={styles.buttonText}>Comunicados</Text>
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
                        <Image source={require('../../../assets/images/Cabo.png')}
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
    button: {
        backgroundColor: '#019063',
        alignItems: 'center',
        margin: 50,
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

export default ZonaScreen;
