import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import TarjetaAnomalia from '../ScriptsComponentes/TarjetaAnomalia';

const PantallaAnomalias = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.titulo}>Catálogo de anomalías</Text>
      <View style={styles.rowContainer}>
        <View style={styles.columnContainer}>
          <TarjetaAnomalia nombreAnomalia={"Falta de inventario"} />
          <TarjetaAnomalia nombreAnomalia={"Rayón o abolladura"} />
          <TarjetaAnomalia nombreAnomalia={"Mal etiquetado"} />
          <TarjetaAnomalia />

        </View>
        <View style={styles.columnContainer}>
          <TarjetaAnomalia nombreAnomalia={"Producto escondido"} />
          <TarjetaAnomalia nombreAnomalia={"Fuera de categoría"} />
          <TarjetaAnomalia />
          <TarjetaAnomalia />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  columnContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: 10
  },
  titulo: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: 'black',
    margin: 30
  }
});

export default PantallaAnomalias;