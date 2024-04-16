import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import NavigationBar from '../ScriptsComponentes/NavigationBar';

const PantallaReporte = () => {
  return (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      <Text style={{fontSize: 30}}>Pantalla para realizar el reporte de anomalías</Text>
      <NavigationBar/>
    </View>
  );
}
  
export default PantallaReporte;