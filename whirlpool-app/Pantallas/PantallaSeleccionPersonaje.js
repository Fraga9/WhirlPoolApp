import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import TarjetaPersonaje from '../ScriptsComponentes/TarjetaPersonaje';
import { FontAwesome } from '@expo/vector-icons';
import PersonajesData from '../ScriptsComponentes/PersonajesData';

// Parámetros de prueba
const personajePrincipal = require("../images/rotomrefri.png");
const imagenFondo = require("../images/fondos/fondo3.png");
const puntosPersonajeReporte = 150;

const { height, width } = Dimensions.get('window');
const topSectionHeight = height * 0.35;

const PantallaSeleccionPersonaje = () => {
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(PersonajesData[0]);
  const translateY = new Animated.Value(0); // Valor inicial de la animación

  const handleSeleccionarPersonaje = (personaje) => {
    setPersonajeSeleccionado(personaje);
  }

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    );
  
    animation.start();
  
    return () => {
      animation.stop();
    };
  }, [personajeSeleccionado]);
  

  const animatedStyle = {
    transform: [{ translateY: translateY }],
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>

        <Image source={imagenFondo} style={styles.imagenFondo} />

        <View style={styles.topSectionContainer}>
          <Text style={[styles.titulo, {marginVertical: 20}]}>Escoge a tu personaje</Text>

          <View style={styles.rowContainer}>

            <View style={[styles.columnContainer, {flex: 0.6}]}>
              <Text style={[styles.titulo, {fontSize: 15, marginBottom: 20}]}>{personajeSeleccionado.nombre}</Text>
              <View style={[styles.rowContainer, {flex: 0.9}]}>
                <Animated.Image source={personajeSeleccionado.foto} style={[styles.personajeEscogido, animatedStyle]} />
              </View>
              <View style={[styles.rowContainer, {justifyContent: 'space-between', flex: 0.1, paddingHorizontal: 50, marginVertical: 10}]}>
                {Array(personajeSeleccionado.rareza).fill().map((_, index) => (
                  <FontAwesome key={index} name="star" size={20} color="gold" />
                ))}
              </View>
            </View>
            

            <View style={[styles.columnContainer, {flex: 0.4}]}>
              <Text style={[styles.titulo, {fontSize: 15}]}>Nivel {personajeSeleccionado.mejoras}</Text>
              <View style={{paddingHorizontal: 25}}>
                <Text style={[{fontSize:15, fontWeight: 'bold', marginVertical: 30, textAlign: 'center'}]}>
                  Brinda {personajeSeleccionado.bonificacion} puntos en tu siguiente reporte
                </Text>
              </View>
              <TouchableOpacity style={styles.seleccionarButton}>
                <Text style={[styles.titulo, {fontSize: 18, color: '#6D6D6C'}]}>Seleccionar</Text> 
              </TouchableOpacity>  
            </View>

          </View>

        </View>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {PersonajesData.map((personaje, index) => (
          <TarjetaPersonaje key={index} imageSource={personaje.foto} nombrePersonaje={personaje.nombre} onPress={() => handleSeleccionarPersonaje(personaje)}/>
        ))}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  topSectionContainer: {
    width: '100%',
    height: topSectionHeight,
    alignItems: 'center',
  },
  imagenFondo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  columnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
  },
  personajeEscogido: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  seleccionarButton: {
    width: '85%',
    height: '20%',
    borderRadius: 15,
    backgroundColor: '#eeb111',
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, // Para Android
  },
});

export default PantallaSeleccionPersonaje;