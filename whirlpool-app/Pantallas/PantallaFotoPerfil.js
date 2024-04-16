import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PantallaFotoPerfil = () => {
    const [profileImage, setProfileImage] = useState(null);

    const loadImageFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert("Debes dar permiso para acceder a las imágenes del dispositivo.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (result.canceled) {
            return;
        }

        setProfileImage(result.uri);
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.texto, { marginTop: 30, marginBottom: 100 }]}>Foto de perfil</Text>

            <View style={styles.circle}>
                <Image style={styles.foto} source={profileImage ? { uri: profileImage } : require("../images/iconoempleado.png")} />
            </View>

            <TouchableOpacity style={[styles.button, { backgroundColor: '#D9D9D9', marginTop: 60 }]}>
                <Text style={styles.texto}>Tomar foto y subir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#000000' }]} onPress={loadImageFromGallery}>
                <Text style={[styles.texto, { color: '#fff' }]}>Escoger del dispositivo</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    texto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    circle: {
        width: '85%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeb111',
        borderRadius: 200,
        overflow: 'hidden',
    },
    button: {
        width: '85%',
        height: '6%',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    foto: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
});

export default PantallaFotoPerfil;
