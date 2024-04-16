import React from 'react';
import { StatusBar, Image, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CircleWithImage from '../ScriptsComponentes/CircleWithImage';
import DetallesReporte from '../ScriptsComponentes/DetallesReporte';
import Widget from '../ScriptsComponentes/Widget';
import Progress from '../ScriptsComponentes/Progress';
import TarjetaPersonaje from '../ScriptsComponentes/TarjetaPersonaje';
import NavigationBar from '../ScriptsComponentes/NavigationBar';
import PersonajesData from '../ScriptsComponentes/PersonajesData';

// Parámetros de prueba
const nombreUsuario = "Miguel";
const status = 4;
const personajePrincipal = PersonajesData[0];
const fotoEmpleado = require("../images/iconoempleado.png");
const personajeSecundario = PersonajesData[1];
const imagenWidgetReportar = require("../images/reporteconcelular.png");
const imagenWidgetAnomalias = require("../images/imagenanomalias.png");
const iconoInforme = require("../images/iconoinforme.png");
const imagenFondo = require("../images/fondos/fondoprueba.png");



const { height, width } = Dimensions.get('window');
const topSectionHeight = height * 0.45;
const saludoContainerHeight = topSectionHeight*0.45;
const topRoundedRectangleHeight = topSectionHeight*0.55;


const PantallaPrincipal = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topSection}>

          <Image source={imagenFondo} style={styles.imagenFondo} />
          <View style={styles.saludoContainer}>
            <View style={styles.circuloSaludo}></View>
            <View style={[styles.columnContainer, {alignItems: 'flex-start'}]}>
              <Text style={styles.saludo}>Hola,</Text>
              <Text style={[styles.saludo, {fontWeight: 'bold'}]}>{nombreUsuario}</Text>
            </View>
          </View>

          <View style={styles.topRoundedRectangle}>
            <View style={[styles.columnContainer, {justifyContent: 'flex-end'}, {alignItems: 'flex-end'}, {height: '100%'}]}>
              <CircleWithImage color='#6D6D6C' imageSource={personajePrincipal.foto} imageHeight='140%' imageWidth='140%' onPress={() => navigation.navigate('PantallaSeleccionPersonaje')} animate={true}/>
            </View>
            <View style={[styles.columnContainer, {justifyContent: 'flex-start'}, {alignItems: 'center'}, {height: '100%'}]}>
              <CircleWithImage color='#eeb111' imageSource={fotoEmpleado} imageHeight='70%' imageWidth='70%' onPress={() => navigation.navigate('PantallaFotoPerfil')} animate={false}/>
              <Text>100 puntos</Text>
            </View>
            <View style={[styles.columnContainer, {justifyContent: 'flex-end'}, {alignItems: 'flex-start'}, {height: '100%'}]}>
              <CircleWithImage color='#D9D9D9' imageSource={personajeSecundario.foto} imageHeight='140%' imageWidth='140%' onPress={() => navigation.navigate('PantallaSeleccionPersonaje')} animate={true}/>
            </View>
          </View>

        </View>

        <Text style={styles.textoSeccion}>Solicitud en curso</Text>

        <Progress currentStep={status}/>

        <Text style={[styles.textoSeccion, {marginBottom: 0}]}>Tus opciones</Text>

        <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
          <View style={[styles.rowContainer, {marginTop: 20}]}>
            <Widget contenido="Reportes realizados" imageSource={imagenWidgetReportar} rotation={15} onPress={() => navigation.navigate('PantallaReporte')}/>
            <Widget contenido="Aquí podrás consultar el catálogo de anomalías que puedes reportar" imageSource={imagenWidgetAnomalias} rotation={0} onPress={() => navigation.navigate('PantallaAnomalias')}/>
            <Widget contenido="Reportes realizados" imageSource={imagenWidgetReportar} rotation={15} onPress={() => navigation.navigate('PantallaReporte')}/>
            <Widget contenido="Reportes realizados" imageSource={imagenWidgetReportar} rotation={-10} onPress={() => navigation.navigate('PantallaReporte')}/>
          </View>
        </ScrollView>

        <Text style={styles.textoSeccion}>Últimos reportes</Text>

        <DetallesReporte contenido="fksjafjkbafjksbjaaaaaaaaaajkfsaajfk" imageSource={iconoInforme} />
        <DetallesReporte contenido="fksjafjkbafjksbjaaaaaaaaaajkfsaajfk" imageSource={iconoInforme} />
        <DetallesReporte contenido="fksjafjkbafjksbjaaaaaaaaaajkfsaajfk" imageSource={iconoInforme} />
        <DetallesReporte contenido="fksjafjkbafjksbjaaaaaaaaaajkfsaajfk" imageSource={iconoInforme} />
        <DetallesReporte contenido="fksjafjkbafjksbjaaaaaaaaaajkfsaajfk" imageSource={iconoInforme} />
        
        <TarjetaPersonaje imageSource={personajeSecundario.foto} nombrePersonaje={"Rotom Lavado"}/>

        <StatusBar style="auto" />
        
      </ScrollView>

      <NavigationBar />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  topSection: {
    width: '100%',
    height: topSectionHeight,
    alignItems: 'flex-start',
  },
  imagenFondo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  saludoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: saludoContainerHeight,
    marginLeft: 20,
  },
  circuloSaludo: {
    width: 25,
    height: 25,
    borderRadius: 200,
    backgroundColor: '#00D95F',
  },
  saludo: {
    fontSize: 20,
    marginLeft: 10,
    color: '#fff'
  },
  topRoundedRectangle: {
    flexDirection: 'row',
    height: topRoundedRectangleHeight,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  columnContainer: {
    flex:1,
    flexDirection: 'column',
  },
  rowContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    flex: 1,
  },



  textoSeccion: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
});


export default PantallaPrincipal;