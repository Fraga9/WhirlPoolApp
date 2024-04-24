import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const PantallaFotoPerfil = () => {
    const [profileImage, setProfileImage] = useState(null);

    const loadImageFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log("Estado de los permisos de la galería:", status)

        if (status !== 'granted') {
            Alert.alert("Debes dar permiso para acceder a las imágenes del dispositivo.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log("Resultado de la selección de imagen:", result);

        if (result.cancelled || !result.uri || !result.assets[0].uri) {
            console.log("Selección de imagen cancelada.");
            return;
        }

        console.log("URI de la imagen seleccionada:", result.uri);

        setProfileImage(result.uri);

        // Crear FormData para enviar la imagen al servidor
        let formData = new FormData();
        formData.append('file', {
            uri: result.assets[0].uri,
            type: 'image/jpeg',
            name: 'profile_photo.jpg',
        });

        // Enviar la imagen al servidor
        console.log("Enviando imagen al servidor...");
        axios.post('http://54.86.33.126:8000/reportes/foto/', formData)
            .then(response => {
                console.log('Imagen enviada al servidor:', response.data);
            })
            .catch(error => {
                console.error('Error al enviar la imagen al servidor:', error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.texto, { marginTop: 30, marginBottom: 100 }]}>Foto de perfil</Text>

            <View style={styles.circle}>
                <Image style={styles.foto} source={profileImage ? { uri: profileImage } : require("../images/iconoempleado.png")} />
            </View>

            <TouchableOpacity style={[styles.button, { backgroundColor: '#D9D9D9', marginTop: 60 }]} onPress={loadImageFromGallery}>
                <Text style={styles.texto}>Seleccionar desde la galería</Text>
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
