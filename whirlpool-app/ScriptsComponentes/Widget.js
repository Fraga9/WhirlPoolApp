import React from 'react';
import { StyleSheet, Image, Text, View, Dimensions, TouchableOpacity } from 'react-native';

const { height, width } = Dimensions.get('window');
const widthWidget = width * 0.50;
const heightWidget = height * 0.18;
const heightLittleRectangle = heightWidget * 0.135;
const heightRoundedRectangle = heightWidget * 0.60;
const heightBottomRectangle = heightWidget * 0.265;

const Widget = ({ contenido, imageSource, rotation, onPress }) => {
  return (
    <View style={styles.containerWidget}>
      <View style={styles.littleRoundedRectagle}>
        <Text style={{color: 'black'}}>1</Text>
      </View>
      <TouchableOpacity style={styles.roundedRectangle} onPress={onPress}>
        <View style={styles.contentContainer}>
          <Text style={styles.contenido}>{contenido}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={imageSource}
            style={[styles.image, { transform: [{ rotate: `${rotation}deg` }] }]}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.bottomBlackRectangle}>
        <Text style={{color: '#fff'}}>Reportar</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  containerWidget: {
    alignItems: 'flex-start',
    flexDirection: 'Column',
    width: widthWidget,
    height: heightWidget,
    marginHorizontal: 10,
    backgroundColor: '#fff'
  },
  littleRoundedRectagle: {
    height: heightLittleRectangle,
    width: '20%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, // Para Android
    backgroundColor: '#fff'
  },
  bottomBlackRectangle: {
    height: heightBottomRectangle,
    width: '100%',
    backgroundColor: 'black',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, // Para Android
    padding: 5,
  },
  roundedRectangle: {
    height: heightRoundedRectangle,
    width: '100%',
    flexDirection: 'row',
    alignItemst: 'flex-start',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, // Para Android
    backgroundColor: '#fff'
  },



  contentContainer: {
    width: '60%',
    justifyContent: 'center',
    padding: 10,
  },
  imageContainer: {
    width: '40%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: '150%',
    height: '150%',
    resizeMode: 'center',
  },
  contenido: {
    fontSize: 12,
  },
});

export default Widget;
