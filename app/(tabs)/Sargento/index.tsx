import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, Pressable, FlatList, TouchableOpacity, Alert, StyleSheet, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import config from '@/config';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const HomeScreen = () => {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Lunes'); // Estado para el día seleccionado
  
  // Mapeo de los días de la semana
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  // Establecer el día actual cuando la pantalla se carga
  useEffect(() => {
    const currentDayIndex = new Date().getDay();
    setSelectedDay(daysOfWeek[currentDayIndex]);
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://${config.ipApi}:3000/api/alarm`);
      setItems(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch items');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://${config.ipApi}:3000/api/alarm/${id}`);
      Alert.alert('Success', 'Item deleted successfully');
      fetchItems();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete item');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, [])
  );

  // Filtrar las alarmas por el día seleccionado
  const filteredItems = items.filter(item => item.dia === selectedDay);

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
        <View style={styles.divisa}>
          <Image source={require('../../../assets/images/Sargento.png')}
            style={styles.divisas}/>
        </View>
        </ImageBackground>
      </View>
      <View style={styles.cosas}>
        <Text style={styles.titulo}>Alarmas</Text>
        <Picker
          selectedValue={selectedDay}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedDay(itemValue)}
        >
          {daysOfWeek.map((day) => (
            <Picker.Item label={day} value={day} key={day} />
          ))}
        </Picker>
        <Pressable style={styles.button} onPress={() => router.push('/Sargento/crearAlarm')}>
          <Text style={styles.buttonText}>Crear</Text>
        </Pressable>
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.colum}>
                <View style={styles.columText}>
                <TouchableOpacity onPress={() => router.push(`/Sargento/reloj/${item.id}`)}>
                  <Text style={styles.text}>{item.nombre}</Text>
                  <Text style={styles.text}>{item.hora}:{item.min}</Text>
                </TouchableOpacity>
                </View>
              <View style={styles.columEdit}>
                <TouchableOpacity onPress={() => router.push(`/Sargento/editAlarm/${item.id}`)}>
                  <Text style={styles.text_button}>Edit</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.columDelete}>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Text style={styles.text_button}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202523',
    justifyContent: 'flex-start',
  },
  //--------------
  topbar:{
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
  //--------------------
  cosas:{
    top: 125,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colum:{
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingVertical: 10,
    backgroundColor: '#2E3533',

  },
  columText:{
    padding: 15,
    width: '60%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  columEdit:{
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#45473A", 
  },
  columDelete:{

    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10, 
    backgroundColor: "#352E2E",
  },
  //----------
  titulo:{
    marginBottom: 20,
    color: '#FFFFFF',
    fontFamily:'Militar_ExtraBold',
    fontSize: 36,
  },
  text:{
    color: '#FFFFFF',
    fontFamily:'Militar',
    fontSize: 24,
  },
  text_button:{
    color: '#FFFFFF',
    fontFamily:'Militar',
    fontSize: 20,
    marginRight: 10,
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
  picker: {
    height: 50,
    width: 150,
    color: '#FFFFFF', 
    backgroundColor: '#2E3533', 
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default HomeScreen;
