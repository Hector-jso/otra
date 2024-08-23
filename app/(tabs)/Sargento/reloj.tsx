import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, Alert, Image, ImageBackground, Modal, TouchableOpacity} from 'react-native';
import {CountDown} from 'react-native-countdown-component';
import axios from 'axios';
import config from '@/config';
import { useRouter, useLocalSearchParams } from 'expo-router';

const App = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Obtén el parámetro `id` de la URL
  const [Nombre, setNombre] = useState('');
  const [Hora, setHora] = useState('');
  const [Min, setMin] = useState('');
  const [Seg, setSeg] = useState('');
  
  // Estado para manejar si estamos contando hacia la hora asignada o hacia el minuto final
  const [isFinalMinute, setIsFinalMinute] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
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
  }, [id]);

  // Hora asignada (ejemplo: 14:30 en formato de 24 horas)
  const targetTime = new Date();
  targetTime.setHours(Hora);
  targetTime.setMinutes(Min);
  targetTime.setSeconds(Seg);

  // Hora actual
  const currentTime = new Date();


  // Cálculo del tiempo restante en segundos hacia la hora asignada
  const timeDifference = (targetTime - currentTime) / 1000;

  // Si la hora asignada ya pasó, se manejará como 0
  const timeLeft = timeDifference > 0 ? timeDifference : 0;

  const handleFinish = () => {
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <ImageBackground source={require('../../../assets/images/fondo.png')} 
          style={styles.fondo}>
          <View>
            <Image source={require('../../../assets/images/logo.png')}
            style={styles.logo_img}/>
            <Text style={styles.logo_text}>Zona Militar</Text>
          </View>
        </ImageBackground>
      </View>
        {timeLeft > 0 && !isFinalMinute ? (
          // Primera cuenta regresiva hacia la hora asignada
          <CountDown
          until={timeLeft}
          onFinish={() => setIsFinalMinute(true)} // Cambia el estado para iniciar el contador de 1 minuto
          digitStyle={{backgroundColor: '#FFF'}}
          timeLabelStyle={{color: '#019063'}}
          timeToShow={['H','M', 'S']}
          size={30}
          />
        ) : isFinalMinute ? (
          // Contador de 1 minuto una vez que la hora asignada ha llegado
          <CountDown
          until={70} // Forzamos 60 segundos para el contador de 1 minuto
          onFinish={handleFinish} // Muestra la alerta personalizada
          digitStyle={{backgroundColor: '#FFF'}}
          timeLabelStyle={{color: '#019063'}}
          timeToShow={['M','S']}
          size={30}
          />
        ) : (
          <Text>El tiempo ya ha pasado</Text>
        )}
        <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={styles.modalText}>El tiempo</Text>
            <Icon name="clock-o" size={255} color="#019063" />
            <Text style={styles.modalText}>Se ha terminado</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
});

export default App;
