import React, { useState } from 'react';
import { Button, View, Image, FlatList } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

const BotonAccesoGaleria = () => {
  const [images, setImages] = useState([]);

  const openImagePicker = async () => {
    const { status } = await MediaLibrary.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await MediaLibrary.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        console.log('Permiso denegado para acceder a la galería');
        return;
      }
    }

    const media = await MediaLibrary.getAssetsAsync({ mediaType: 'photo' });
    setImages(media.assets); // Guardar las imágenes obtenidas en el estado
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Abrir Galería" onPress={openImagePicker} />
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.uri }}
            style={{ width: 100, height: 100, margin: 5 }}
          />
        )}
        numColumns={3} // Mostrar las imágenes en 3 columnas
      />
    </View>
  );
};

export default BotonAccesoGaleria;
