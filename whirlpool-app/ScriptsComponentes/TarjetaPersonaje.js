import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated } from 'react-native';


const { height, width } = Dimensions.get('window');
const heightTarjeta = height * 0.08;

const TarjetaPersonaje = ({imageSource, nombrePersonaje, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.personajeIMGContainer}>
                <Image source={imageSource} style={styles.personajeIMG}/>
            </View>
            <View style={styles.lineaInclinada}/>
            <View style={styles.nombreContainer}>
                <Text style={styles.nombrePersonaje}>{nombrePersonaje}</Text>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        height: heightTarjeta,
        borderRadius: 15,
        backgroundColor: 'black',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5, // Para Android
        paddingHorizontal: 10,
        overflow: 'hidden'
    },
    personajeIMGContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    personajeIMG: {
        height: 180,
        width: 180,
        flex:1,
        resizeMode: 'cover',
    },
    nombreContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    nombrePersonaje: {
        fontWeight: 'bold',
        color: '#fff'
    },
    lineaInclinada: {
        width: '25%',
        height: 10,
        backgroundColor: '#fff',
        transform: [{ rotate: '-60deg' }],
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderWidth: 2,
        borderColor: 'red'
      },
});

export default TarjetaPersonaje;