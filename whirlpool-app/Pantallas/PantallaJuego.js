import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';

const PantallaJuego = () => {
  useEffect(() => {
    // Cambiar la orientación a horizontal al cargar la pantalla
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      // Restaurar la orientación original al salir de la pantalla
      ScreenOrientation.unlockAsync();
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <WebView source={{ uri: 'https://poki.com/es/g/apple-knight-mini-dungeons' }} style={{ flex: 1 }} />
  );
};
  
export default PantallaJuego;
