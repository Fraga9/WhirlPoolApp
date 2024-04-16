import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const NavigationBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('PantallaPrincipal')}>
        <Entypo name="home" size={30} color="black" />
        <Text>Menú</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('PantallaReporte')}>
        <MaterialIcons name="description" size={30} color="black" />
        <Text>Reporte</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('PantallaJuego')}>
        <Ionicons name="game-controller" size={30} color="black" />
        <Text>Juego</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('PantallaLeaderboard')}>
        <MaterialIcons name="leaderboard" size={30} color="black" />
        <Text>Leaderboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 2,
    borderTopWidth: 1,
    borderTopColor: '#eeb111',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NavigationBar;
