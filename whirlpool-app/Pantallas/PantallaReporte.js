import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Audio } from 'expo-av';
import { Picker } from '@react-native-picker/picker';
import { TextInput, Menu, Button as PaperButton, Provider } from 'react-native-paper';
import { Input, ThemeProvider, Button as ElementsButton } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';



const Report = () => {
  const theme = {
    Button: {
      raised: true,
    },
  };
  const [date, setDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [show, setShow] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [audioUri, setAudioUri] = useState(null);
  const [duration, setDuration] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setDuration(prevDuration => prevDuration + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRecording]);



  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need audio recording permissions to make this work!');
        return;
      }

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error('Error al iniciar la grabación:', error);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);
      setAudioUri(uri);
      setDuration(0);

      console.log('Grabación guardada en:', uri);

      let formData = new FormData();
      formData.append('file', {
        uri: uri,
        type: 'audio/3gp',
        name: 'audio.3gp'
      });

      axios.post('http://54.86.33.126:8000/reportes/transcribe/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

        .then(response => {
          console.log("Transcripción exitosa");
          console.log("Transcribiendo audio...")
          console.log(response.data);
          setDescription(response.data.transcript);
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in Node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    } catch (error) {
      console.error('Error al detener la grabación:', error);
    }
    };

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleAttachImage = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        setCameraOpen(true);
      } else {
        Alert.alert('Camera permission not granted');
      }
    };

    const takePicture = async () => {
      if (cameraRef.current) {
        const options = { quality: 1, base64: true, skipProcessing: false };
        const data = await cameraRef.current.takePictureAsync(options);
        setPhoto(data.uri);
        setCameraOpen(false);
      }
    };

    const toggleFlash = () => {
      setFlashMode(
        flashMode === Camera.Constants.FlashMode.off
          ? Camera.Constants.FlashMode.on
          : Camera.Constants.FlashMode.off
      );
    };




    const handleLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso de acceso a la ubicación denegado');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords.latitude + ', ' + location.coords.longitude);
      console.log(location);
    };

    const handleDate = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };

    const handleSubmit = () => {
      // Aquí puedes manejar la lógica para enviar el reporte :v
    };

    return (
      <View style={styles.container}>
        {cameraOpen ? (
          <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} flashMode={flashMode} ref={cameraRef}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 20,
              }}>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
                onPress={toggleFlash}>
                <Ionicons name={flashMode === Camera.Constants.FlashMode.on ? "flash" : "flash-off"} size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
                onPress={takePicture}>
                <View style={{
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: 'white',
                  height: 50,
                  width: 50,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <View style={{
                    borderWidth: 2,
                    borderRadius: 50,
                    borderColor: 'white',
                    height: 40,
                    width: 40,
                    backgroundColor: 'white'
                  }} >
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
                onPress={() => setCameraOpen(false)}>
                <Ionicons name="close-circle" size={40} color="white" />
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          <>
            <Text style={styles.title}>Fecha de reporte</Text>
            <Input
              placeholder='Fecha'
              value={date.toISOString().split('T')[0]}
              onFocus={() => setShow(true)}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
            />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                display="default"
                onChange={handleDate}
              />
            )}
            <Text style={styles.title}>Motivo</Text>
            <Picker
              selectedValue={reason}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setReason(itemValue)}
            >
              <Picker.Item label="Falta de inventario" value="Inventario" />
              <Picker.Item label="Otro" value="js" />
            </Picker>
            <Text style={styles.title}>Ubicación</Text>
            <Picker
              selectedValue={location}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
            >
              <Picker.Item label="Home Depot Nogalar" value="Home Depot Nogalar" />
              <Picker.Item label="Otro" value="js" />
            </Picker>
            <Text style={styles.title}>Descripción del reporte</Text>
            <Input
              placeholder='Descripción del reporte'
              value={description}
              onChangeText={setDescription}
              multiline
              inputContainerStyle={[styles.inputContainer, { height: 150 }]}
              inputStyle={[styles.input, { height: 150 }]}
            />


            <TouchableOpacity style={[styles.button, { flexDirection: 'row' }]} onPress={handleAttachImage}>
              <Ionicons name="camera" size={24} color="white" />
              <Text style={styles.buttonText}>Tomar fotografía</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isRecording ? '#dd7c02' : '#f29f05', flexDirection: 'row', justifyContent: 'space-between' }]}
              onPress={isRecording ? stopRecording : startRecording}
            > 
              <View style={{ flexDirection: 'row', alignItems: 'center' }}> 
                <Ionicons name={isRecording ? 'stop-circle' : 'mic'} size={24} color="white" />
                <Text style={styles.buttonText}>{isRecording ? 'Detener grabación' : 'Grabar audio'}</Text>
              </View>
              {isRecording && <Text style={[styles.timer, { color: 'white' }]}>{formatTime(duration)}</Text>}
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Enviar reporte</Text>
            </TouchableOpacity>


          </>
        )}
      </View>
    );
  };



  const styles = StyleSheet.create({

    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#ffffff',
      margin: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },

    title: {
      fontSize: 20,
      fontFamily: 'Montserrat-Bold',
      marginBottom: 10,
      paddingLeft: 15,
      color: '#333',
      letterSpacing: 0.5,
    },

    inputContainer: {
      marginBottom: 5,
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#f9f9f9',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },

    input: {
      fontSize: 16,
    },

    button: {
      borderRadius: 10,
      marginBottom: 10,
      marginHorizontal: 10,
      backgroundColor: '#f29f05',
      padding: 10,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },

    submitButton: {
      backgroundColor: '#dd7c02',
    },

    buttonText: {
      color: 'white',
      marginLeft: 10,
      fontSize: 16,
    },

    pickerContainer: {
      borderWidth: 2,
      borderColor: '#aaa',
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#f9f9f9',
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.35,
      shadowRadius: 4,
      elevation: 6,
      overflow: 'hidden',
    },





  });


  export default Report;
