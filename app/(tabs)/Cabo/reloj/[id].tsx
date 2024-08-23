import React, { useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Pressable, Text, StyleSheet, Alert, Image, ImageBackground, Modal, TouchableOpacity } from 'react-native';
import CountDown from 'react-native-countdown-component';
import axios from 'axios';
import config from '@/config';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';

const App = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [Nombre, setNombre] = useState('');
  const [Hora, setHora] = useState('');
  const [Min, setMin] = useState('');
  const [Seg, setSeg] = useState('');
  
  const [isFinalMinute, setIsFinalMinute] = useState(false);
  const [isFinalMinute2, setIsFinalMinute2] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [sound, setSound] = useState();

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

  const targetTime = new Date();
  targetTime.setHours(Hora);
  targetTime.setMinutes(Min);
  targetTime.setSeconds(Seg);

  const currentTime = new Date();
  const timeDifference = (targetTime - currentTime) / 1000;
  const timeLeft = timeDifference > 0 ? timeDifference : 0;

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../../../assets/music/alarm.mp3') // Ajusta la ruta según sea necesario
    );
    setSound(sound);
    await sound.playAsync();
  };

  const handleFinish = () => {
    setShowModal(true);
    setIsFinalMinute2(true);
    playSound();
  };
  const handleFinish2 = () => {
    setShowModal2(true);
    playSound();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alarma</Text>
      <Text style={styles.titulo}>{Nombre}</Text>
      <Text style={styles.titulo}>a las {Hora}:{Min}</Text>
        {timeLeft > 0 && !isFinalMinute ? (
          <CountDown
          until={timeLeft}
          onFinish={() => setIsFinalMinute(true)}
          digitStyle={{backgroundColor: '#FFF'}}
          timeLabelStyle={{color: '#019063'}}
          timeToShow={['H','M', 'S']}
          size={30}
          />
        ) : isFinalMinute  && !isFinalMinute2 ? (
          <CountDown
          until={60}
          onFinish={handleFinish}
          digitStyle={{backgroundColor: '#FFF'}}
          timeLabelStyle={{color: '#019063'}}
          timeToShow={['M','S']}
          size={30}
          />
        ) : isFinalMinute2 ? (
          <CountDown
          until={60}
          onFinish={handleFinish2}
          digitStyle={{backgroundColor: '#FFF'}}
          timeLabelStyle={{color: '#019063'}}
          timeToShow={['M','S']}
          size={30}
          />
        ) : (
          <Text style={styles.textTiempo}>El tiempo ya ha pasado</Text>
        )}
        <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Text style={styles.modalText}>El tiempo</Text>
              <Icon name="clock-o" size={255} color="#019063" />
              <Text style={styles.modalText}>Se ha terminado</Text>
              <Text style={styles.modalText}>para Cabos y Cabos</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
        visible={showModal2}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={styles.modalText}>El tiempo</Text>
            <Icon name="clock-o" size={255} color="#019063" />
            <Text style={styles.modalText}>Se ha terminado</Text>
            <Text style={styles.modalText}>para Cabos</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Pressable style={styles.button} onPress={() => router.push('/Cabo')}>
        <Text style={styles.buttonText}>Regresar</Text>
      </Pressable>
      <View style={styles.topbar}>
        <ImageBackground source={require('../../../../assets/images/fondo.png')} 
          style={styles.fondo}>
          <View>
            <Image source={require('../../../../assets/images/logo.png')}
            style={styles.logo_img}/>
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
  container: {
    flex: 1,
    backgroundColor: '#202523',
    justifyContent: 'center',
    alignItems: 'center',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 350,
    padding: 20,
    backgroundColor: '#1E4035',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 40,
    marginBottom: 20,
    color: '#FFFFFF',
    fontFamily:'Militar',
  },
  closeButton: {
    backgroundColor: '#019063',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '50%',
  },
  closeButtonText: {
    color: 'white',
    fontFamily:'Militar',
    fontSize: 24,
  },
  titulo:{
    marginBottom: '10%',
    color: '#FFFFFF',
    fontFamily:'Militar_ExtraBold',
    fontSize: 36,
  },
  textTiempo:{
    marginBottom: '10%',
    color: '#FF0000',
    fontFamily:'Militar_ExtraBold',
    fontSize: 30,
  },
  button: {
    marginTop: 30,
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

export default App;
