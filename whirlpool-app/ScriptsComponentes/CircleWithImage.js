import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const CircleWithImage = ({ color, imageSource, imageHeight, imageWidth, onPress, animate }) => {
  const translateY = useRef(new Animated.Value(0)).current; // Utilizamos useRef para mantener el valor

  useEffect(() => {
    if (animate) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [animate]);

  const startAnimation = () => {
    Animated.loop(
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
    ).start();
  };

  const stopAnimation = () => {
    translateY.setValue(0); // Reiniciar el valor de la animación
    translateY.stopAnimation(); // Detener la animación actual
  };

  const animatedStyle = {
    transform: [{ translateY: translateY }],
  };

  return (
    <TouchableOpacity style={[styles.circle, { backgroundColor: color }]} onPress={onPress}>
      <Animated.Image
        source={imageSource}
        style={[
          styles.image,
          { height: imageHeight },
          { width: imageWidth },
          animate ? animatedStyle : {}, // Aplicar el estilo animado solo si animate es true
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 130,
    height: 130,
    borderRadius: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, // Para Android
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
  },
});

export default CircleWithImage;
