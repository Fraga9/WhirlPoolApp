import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import NavigationBar from '../ScriptsComponentes/NavigationBar';

const PantallaLeaderboard = () => {
  return (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      <Text style={{fontSize: 30}}>Pantalla para ver el ranking de empleados</Text>
      <NavigationBar />
    </View>
  );
}
  
export default PantallaLeaderboard;