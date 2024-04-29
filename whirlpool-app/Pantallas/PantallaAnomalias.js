import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import TarjetaAnomalia from '../ScriptsComponentes/TarjetaAnomalia';

const urlinventario = { uri: "https://cnnespanol.cnn.com/wp-content/uploads/2022/01/220111171145-01-us-supermarket-empty-shelves-omicron-supply-chain-0109-full-169.jpg?quality=100&strip=info" }
const urlrayon = { uri: "https://preview.redd.it/hrd9z9rco6cb1.jpg?width=640&crop=smart&auto=webp&s=ab504094c9b8f2d498c5d76b2ff503bb16bc65ad" }
const urlEtiquetado = { uri: "https://www.endesa.com/content/dam/endesa-com/endesaclientes/blog/imagenes/15_POST_etiqueta-energetica.jpg" }
const urlEscondido = { uri: "https://estaticos-cdn.prensaiberica.es/clip/28c3d137-2389-47dc-9554-85aab9299344_alta-libre-aspect-ratio_default_0.jpg" }
const urlCategoria = { uri: "https://www.milar.es/statics/store/00/00/09/17/b3ba50ef3ced11bca79cbc45d8fa8dddeb2188c5.jpg" }

const PantallaAnomalias = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.titulo}>Catálogo de anomalías</Text>
      <View style={styles.rowContainer}>
        <View style={styles.columnContainer}>
          <TarjetaAnomalia nombreAnomalia={"Falta de inventario"} imagenAnomalia={urlinventario} />
          <TarjetaAnomalia nombreAnomalia={"Rayón o abolladura"} imagenAnomalia={urlrayon} />
          <TarjetaAnomalia nombreAnomalia={"Mal etiquetado"} imagenAnomalia={urlEtiquetado} />
          <TarjetaAnomalia />

        </View>
        <View style={styles.columnContainer}>
          <TarjetaAnomalia nombreAnomalia={"Producto escondido"} imagenAnomalia={urlEscondido} />
          <TarjetaAnomalia nombreAnomalia={"Fuera de categoría"} imagenAnomalia={urlCategoria} />
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