import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, Alert, StyleSheet, ImageBackground, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import config from '@/config';
import { useRouter } from 'expo-router';

const CreateScreen = () => {
  const router = useRouter();
  const [Nombre, setNombre] = useState('');
  const [Dia, setDia] = useState('');
  const [Hora, setHora] = useState('');
  const [Min, setMin] = useState('');
  const [Seg, setSeg] = useState('');

  // Mapeo de los días de la semana
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  // Establecer el día actual cuando la pantalla se carga
  useEffect(() => {
    const currentDayIndex = new Date().getDay();
    setDia(daysOfWeek[currentDayIndex]);
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post(`http://${config.ipApi}:3000/api/alarm`, { nombre: Nombre, dia: Dia, hora: Hora, min: Min, seg: Seg });
      Alert.alert('Success', 'Alarma creada exitosamente');
      router.push('/Sargento/'); // Navega de vuelta a la pantalla principal
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la alarma');
      console.log(error);
    }
  };

  return (
    <View style={styles.todo}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Crear Alarma</Text>
        <Pressable style={styles.regresar} onPress={() => router.push('Sargento/')}>
          <Text style={styles.buttonText}>Regresar</Text>
        </Pressable>
        <View style={styles.form}>
          <Text style={styles.text}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#019063"
            value={Nombre}
            onChangeText={setNombre}
            placeholder="Nombre de la alarma"
          />
          <Text style={styles.text}>Día de la Semana</Text>
          <Picker
            selectedValue={Dia}
            style={styles.input}
            onValueChange={(itemValue) => setDia(itemValue)}>
            {daysOfWeek.map((day) => (
              <Picker.Item label={day} value={day} key={day} />
            ))}
          </Picker>
          <Text style={styles.text}>Hora</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#019063"
            keyboardType="numeric"
            maxLength={2}
            value={Hora}
            onChangeText={setHora}
            placeholder="Hora"
          />
          <Text style={styles.text}>Minutos</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#019063"
            keyboardType="numeric"
            maxLength={2}
            value={Min}
            onChangeText={setMin}
            placeholder="Minutos"
          />
          <Text style={styles.text}>Segundos</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#019063"
            keyboardType="numeric"
            maxLength={2}
            value={Seg}
            onChangeText={setSeg}
            placeholder="Segundos"
          />
        </View>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Crear</Text>
        </Pressable>
      </View>
      <View style={styles.topbar}>
        <ImageBackground
          source={require('../../../assets/images/fondo.png')}
          style={styles.fondo}>
          <View>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo_img}
            />
            <Text style={styles.logo_text}>Zona Militar</Text>
          </View>
          <View style={styles.divisa}>
            <Image
              source={require('../../../assets/images/Sargento.png')}
              style={styles.divisas}
            />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  todo: {
    flex: 1,
  },
  container: {
    flex: 1,
    top: 125,
    backgroundColor: '#202523',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topbar: {
    flex: 1,
    backgroundColor: '#023D2A',
    alignContent: 'flex-start',
    position: 'absolute',
    top: 0,
    height: 125,
    width: '100%',
  },
  fondo: {
    height: '100%',
  },
  logo_img: {
    left: '2%',
    marginTop: '7%',
    paddingTop: '17%',
    paddingRight: '15%',
    width: '10%',
    height: '10%',
  },
  logo_text: {
    left: '2%',
    marginTop: '2%',
    color: '#FFFFFF',
    fontFamily: 'Militar',
  },
  divisa: {
    position: 'absolute',
    right: '2%',
    top: 0,
    marginTop: '7%',
    width: '12%',
    height: '70%',
  },
  divisas: {
    width: '100%',
    height: '100%',
  },
  form: {
    marginTop: '2%',
    height: '75%',
    width: '90%',
    alignItems: 'center',
  },
  titulo: {
    position: 'absolute',
    top: 35,
    marginBottom: '5%',
    color: '#FFFFFF',
    fontFamily: 'Militar_ExtraBold',
    fontSize: 36,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 28,
    fontFamily: 'Militar_ExtraBold',
  },
  input: {
    alignItems: 'center',
    backgroundColor: '#2E3533',
    margin: 12,
    padding: 10,
    width: '50%',
    height: '8%',
    fontSize: 18,
    color: '#019063',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 26,
    color: '#FFFFFF',
    fontFamily: 'Militar',
  },
  button: {
    bottom: '10%',
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

export default CreateScreen;
