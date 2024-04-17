import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native'; 
import * as ScreenOrientation from 'expo-screen-orientation';

const PantallaJuego = () => {
  useFocusEffect(
    React.useCallback(() => {
      // Bloquear la orientación a vertical cada vez que la pantalla gana el foco
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      return () => {
        // Desbloquear la orientación al perder el foco
        ScreenOrientation.unlockAsync();
      };
    }, [])
  );

  return (
    <WebView source={{ uri: 'https://poki.com/es/g/apple-knight-mini-dungeons' }} style={{ flex: 1 }} />
  );
};
  
export default PantallaJuego;
