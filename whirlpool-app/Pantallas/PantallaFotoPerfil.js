import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const PantallaFotoPerfil = () => {
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        axios.get('http://54.86.33.126:8000/reportes/empleado/1/')
            .then(response => {
                console.log("Response data:", response.data);
                const fotoPerfil = response.data.foto_perfil;
                console.log("Foto perfil:", fotoPerfil);
                setProfileImage(fotoPerfil ? { uri: fotoPerfil } : null);
            })
            .catch(error => {
                console.log("Error fetching profile image:", error);
            });
    }, []);


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
            base64: true,
        });

        if (result.cancelled || !result.assets || !result.assets[0].uri) {
            console.log("Selección de imagen cancelada.");
            return;
        }

        console.log("URI de la imagen seleccionada:", result.assets[0].uri);

        setProfileImage({ uri: result.assets[0].uri });
    };

    const updateProfilePicture = async () => {
        if (!profileImage) {
            console.log("No image selected.");
            return;
        }

        // The id of the employee to update
        const employeeId = 1;

        // The URL of the API endpoint
        const url = `http://54.86.33.126:8000/reportes/empleado/${employeeId}/`;

        // Create a new FormData instance
        let formData = new FormData();

        // Get the local file as a blob
        let localUri = profileImage.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        // Add the image to the form data
        formData.append('foto_perfil', { uri: localUri, name: filename, type });

        // Send the PATCH request
        axios.patch(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log('Employee updated:', response.data);
                setProfileImage({ uri: response.data.foto_perfil });
            })
            .catch(error => {
                console.error('Error updating employee:', error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.texto, { marginTop: 30, marginBottom: 100 }]}>Foto de perfil</Text>

            <View style={styles.circle}>
                {profileImage ? (
                    <Image style={styles.foto} source={{ uri: profileImage.uri }} />
                ) : (
                    <Image style={styles.foto} source={require("../images/iconoempleado.png")} />
                )}
            </View>

            <TouchableOpacity style={[styles.button, { backgroundColor: '#D9D9D9', marginTop: 60 }]} onPress={loadImageFromGallery}>
                <Text style={styles.texto}>Seleccionar desde la galería</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: '#eeb111', marginTop: 60 }]} onPress={updateProfilePicture}>
                <Text style={styles.texto}>Actualizar foto de perfil</Text>
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
