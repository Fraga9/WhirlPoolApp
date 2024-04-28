import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navbar from './ScriptsComponentes/NavigationBar';
import { setCustomText } from 'react-native-global-props';
import * as Font from 'expo-font';


const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins-Regular': require('./fonts/Poppins/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./fonts/Poppins/Poppins-Bold.ttf'),
        'Poppins-SemiBold': require('./fonts/Poppins/Poppins-SemiBold.ttf'),
        'Poppins-Medium': require('./fonts/Poppins/Poppins-Medium.ttf'),
        'Poppins-Light': require('./fonts/Poppins/Poppins-Light.ttf'),
        'Montserrat-Regular': require('./fonts/Poppins/Montserrat/static/Montserrat-Regular.ttf'),
        'Montserrat-Bold': require('./fonts/Poppins/Montserrat/static/Montserrat-Bold.ttf'),
        'Montserrat-SemiBold': require('./fonts/Poppins/Montserrat/static/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium': require('./fonts/Poppins/Montserrat/static/Montserrat-Medium.ttf'),
        'Montserrat-Black': require('./fonts/Poppins/Montserrat/static/Montserrat-Black.ttf'),
      });
      setFontsLoaded(true);

      const customTextProps = {
        style: {
          fontFamily: 'Montserrat-Regular',
        },
      };
      setCustomText(customTextProps);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Or return a loading indicator
  }

  return (
    <NavigationContainer>
      <Navbar />
    </NavigationContainer>
  );
};

export default App;