import React from 'react';
import { Image, StyleSheet, Text, View, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';



const { height, width } = Dimensions.get('window');

const containerHeight = height * 0.2;
const roundedRectangleHeight = containerHeight * 0.8;
const blackRectangleHeight = containerHeight * 0.2;


const TarjetaAnomalia = ({ nombreAnomalia }) => {
  return(
      <View style={styles.container}>
          <TouchableOpacity style={styles.roundedRectangle}/>
          <View style={styles.bottomRectangle}>
              <Text style={styles.nombreAnomalia}>{nombreAnomalia}</Text>
          </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: containerHeight,
    aspectRatio: 1,
    marginVertical: 10,
  },
  roundedRectangle: {
    width: '100%',
    height: roundedRectangleHeight,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  bottomRectangle: {
    width: '100%',
    height: blackRectangleHeight,
    backgroundColor: '#FFF8D6',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  nombreAnomalia: {
    fontSize: 15,
    fontFamily: 'Montserrat-Bold',
    color: 'black',
  },
  numeroAnomalia: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    margin: 30
  }
});

export default TarjetaAnomalia;