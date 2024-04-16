import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PantallaPrincipal from './PantallaPrincipal';
import PantallaSeleccionPersonaje from './PantallaSeleccionPersonaje';
import PantallaReporte from './PantallaReporte';
import PantallaLeaderboard from './PantallaLeaderboard';
import PantallaAnomalias from './PantallaAnomalias';
import PantallaJuego from './PantallaJuego';
import PantallaFotoPerfil from './PantallaFotoPerfil';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PantallaPrincipal">
        <Stack.Screen name="PantallaPrincipal" component={PantallaPrincipal} options={{ headerShown: false }} />
        <Stack.Screen name="PantallaJuego" component={PantallaJuego} options={{ headerShown: false }} />
        <Stack.Screen name="PantallaReporte" component={PantallaReporte} options={{ headerShown: false }} />
        <Stack.Screen name="PantallaLeaderboard" component={PantallaLeaderboard} options={{ headerShown: false }} />
        <Stack.Screen name="PantallaAnomalias" component={PantallaAnomalias} options={{headerShown: false}}/>
        <Stack.Screen name="PantallaSeleccionPersonaje" component={PantallaSeleccionPersonaje} options={{headerShown: false}}/>
        <Stack.Screen name="PantallaFotoPerfil" component={PantallaFotoPerfil} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
