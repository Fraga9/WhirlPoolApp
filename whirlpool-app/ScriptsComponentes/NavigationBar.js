import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import PantallaPrincipal from '../Pantallas/PantallaPrincipal';
import PantallaReporte from '../Pantallas/PantallaReporte';
import PantallaLeaderboard from '../Pantallas/PantallaLeaderboard';
import PantallaJuego from '../Pantallas/PantallaJuego';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaAnomalias from '../Pantallas/PantallaAnomalias';
import PantallaFotoPerfil from '../Pantallas/PantallaFotoPerfil';
import PantallaSeleccionPersonaje from '../Pantallas/PantallaSeleccionPersonaje';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Menú') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Reporte') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Juego') {
            iconName = focused ? 'game-controller' : 'game-controller-outline';
          } else if (route.name === 'Leaderboard') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#F29F05",
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#1E1E1E',
          borderTopColor: 'transparent',
          paddingBottom: 5,
          paddingTop: 5
        },
        headerShown: false
      })}
    >
      <Tab.Screen name="Menú" component={PantallaPrincipal} />
      <Tab.Screen name="Reporte" component={PantallaReporte} />
      <Tab.Screen name="Juego" component={PantallaJuego} />
      <Tab.Screen name="Leaderboard" component={PantallaLeaderboard} />
    </Tab.Navigator>
  );
}

function NavigationBar() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="Anomalías" component={PantallaAnomalias} />
      <Stack.Screen name="PantallaFotoPerfil" component={PantallaFotoPerfil} />
      <Stack.Screen name="PantallaSeleccionPersonaje" component={PantallaSeleccionPersonaje} />
    </Stack.Navigator>
  );
}

export default NavigationBar;