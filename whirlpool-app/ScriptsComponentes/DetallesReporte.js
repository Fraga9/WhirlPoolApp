import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';

const { height, width } = Dimensions.get('window');
const widthRectangle = width * 0.85;
const imageContainerWitdh =  width * 0.15;

const DetallesReporte = ({ contenido, imageSource }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
          style={styles.image}
        />
      </View>

      <TouchableOpacity style={styles.roundedRectangle}>
        <Text>{contenido}</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 10,
    marginRight: 10 ,
  },
  imageContainer: {
    height: '100%',
    width: imageContainerWitdh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  roundedRectangle: {
    width: widthRectangle,
    height: '100%',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#D9D9D9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, // Para Android
    paddingLeft: 10,
  },
});

export default DetallesReporte;
