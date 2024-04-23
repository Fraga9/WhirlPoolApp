import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import axios from 'axios';

const Leaderboard = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://54.86.33.126:8000/reportes/empleado')
      .then(response => {
        const sortedEmpleados = response.data.sort((a, b) => b.puntos_juego - a.puntos_juego);
        setEmpleados(sortedEmpleados);
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
              <Text>{empleados[2]?.nombre + ' ' + empleados[2]?.apellido}</Text>
              <Text>3rd</Text>
            </View>
            <View style={styles.podiumItem}>
              <Avatar source={{ uri: empleados[0]?.foto_perfil }} />
              <Text>{empleados[0]?.nombre + ' ' + empleados[0]?.apellido}</Text>
              <Text>1st</Text>
            </View>
            <View style={styles.podiumItem}>
              <Avatar source={{ uri: empleados[1]?.foto_perfil }} />
              <Text>{empleados[1]?.nombre + ' ' + empleados[1]?.apellido}</Text>
              <Text>2nd</Text>
            </View>
          </View>
          {empleados.slice(3).map((empleado, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{i+4}. {empleado.nombre + ' ' + empleado.apellido}</ListItem.Title>
                <ListItem.Subtitle>{empleado.puntos_juego} puntos</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
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
    padding: 20,
  },
  leaderboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  podiumItem: {
    alignItems: 'center',
  },
});

export default Leaderboard;