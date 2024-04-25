import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const Leaderboard = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://54.86.33.126:8000/reportes/empleado')
      .then(response => {
        const sortedEmpleados = response.data.sort((a, b) => b.puntos_trabajo - a.puntos_trabajo);
        setEmpleados(sortedEmpleados);
        console.log(sortedEmpleados);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <ScrollView>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={styles.leaderboardContainer}>
          <Text style={styles.leaderboardTitle}>Leaderboard</Text>
          <View style={styles.podium}>
            <View style={styles.podiumItem}>
              <Avatar source={{ uri: empleados[2]?.foto_perfil }} />
              <Text style={{ color: '#FFFFFF', marginTop: 5, fontFamily: 'Montserrat-Bold' }}>{empleados[2]?.nombre + ' ' + empleados[2]?.apellido}</Text>
              <View style={styles.points}>
                <Ionicons name="star-outline" size={16} color="white" />
                <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 16, marginLeft: 10 }}>{empleados[2].puntos_trabajo}</Text>
              </View>
              <View style={styles.bar3}>
                <Text style={styles.barChar}>3</Text>
              </View>
            </View>
            <View style={styles.podiumItem}>
              <Avatar source={{ uri: empleados[0]?.foto_perfil }} />
              <Text style={{ color: '#FFFFFF', marginTop: 5, fontFamily: 'Montserrat-Bold' }}>{empleados[0]?.nombre + ' ' + empleados[0]?.apellido}</Text>
              <View style={styles.points}>
                <Ionicons name="star-outline" size={16} color="white" />
                <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 16, marginLeft: 10 }}>{empleados[0].puntos_trabajo}</Text>
              </View>
              <View style={styles.bar1}>
                <Text style={styles.barChar}>1</Text>
              </View>
            </View>
            <View style={styles.podiumItem}>
              <Avatar source={{ uri: empleados[1]?.foto_perfil }} />
              <Text style={{ color: '#FFFFFF', marginTop: 5, fontFamily: 'Montserrat-Bold' }}>{empleados[1]?.nombre + ' ' + empleados[1]?.apellido}</Text>
              <View style={styles.points}>
                <Ionicons name="star-outline" size={16} color="white" />
                <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 16, marginLeft: 10 }}>{empleados[1].puntos_trabajo}</Text>
              </View>
              <View style={styles.bar2}>
                <Text style={styles.barChar}>2</Text>
              </View>
            </View>
          </View>
          <View style={styles.underPodium}>
            {empleados.slice(3).map((empleado, index) => (
              <ListItem key={index} containerStyle={styles.listItemContainer}>
                <ListItem.Content style={styles.listItemContent}>
                  <View style={styles.listItemLeft}>
                    <Text style={styles.listItemPosition}>{index + 4}</Text>
                    <Avatar source={{ uri: empleado.foto_perfil }} />
                    <ListItem.Title style={styles.listItemTitle}>{empleado.nombre + ' ' + empleado.apellido}</ListItem.Title>
                  </View>
                  <View style={styles.points}>
                    <Ionicons name="star-outline" size={16} color="white" />
                    <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 16, marginLeft: 10 }}>{empleado.puntos_trabajo}</Text>
                  </View>
                </ListItem.Content>
              </ListItem>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaderboardContainer: {
    flex: 1,
    backgroundColor: '#141110',

  },
  leaderboardTitle: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: '#FFF6EA',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 250,
    padding: 10,
  },
  podiumItem: {
    alignItems: 'center',
  },
  underPodium: {
    backgroundColor: '#FFF6EA',
    flex: 1,
    height: 800,
    borderRadius: 30,
    zIndex: 2,
  },

  bar1: {
    backgroundColor: '#eeb111',
    width: 100,
    height: 150,
    borderRadius: 10,
    marginTop: 40,
  },
  bar2: {
    backgroundColor: '#eeb111',
    width: 100,
    height: 150,
    borderRadius: 10,
    marginTop: 60,
  },
  bar3: {
    backgroundColor: '#eeb111',
    width: 100,
    height: 150,
    borderRadius: 10,
    marginTop: 80,
  },

  barChar: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    marginTop: 10,
  },

  points: {
    backgroundColor: '#eeb111',
    width: 90,
    height: 30,
    borderRadius: 30,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItemContainer: {
    backgroundColor: '#FFF6EA',
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  listItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemPosition: {
    marginRight: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  listItemTitle: {
    marginLeft: 10,
    fontSize: 16,
  },


});

export default Leaderboard;