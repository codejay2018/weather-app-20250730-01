import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { desc } from './utils/weatherDescM';


const WeatherDesc = ({ day }) => {
  const id = day?.weather?.[0]?.id;
  const weatherInfo = desc.find((item) => item.id === id);

    return (
        <View style={styles.container}>
            {weatherInfo && 
            // <Fontisto name={weatherInfo.icon} size={30} color="black" />
            <MaterialCommunityIcons name={weatherInfo.icon} size={50} color="black" />
            }
            <Text style={styles.desc}>{weatherInfo ? weatherInfo.text : "Not Found."}</Text>
        </View>
    );

};


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  desc: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default WeatherDesc;