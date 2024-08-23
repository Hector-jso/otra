import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CreateScreen from '../app/(tabs)/Teniente/crear';
import EditScreen from '../app/(tabs)/editar';
import HomeScreen from '../app/(tabs)/Teniente/index';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Create" component={CreateScreen} />
      <Stack.Screen name="Edit" component={EditScreen} /> {/* Verifica que esta ruta esté correctamente configurada */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
