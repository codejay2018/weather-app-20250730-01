import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {

  const [number, setNumber] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.v1}></View>
      <View style={styles.v2}></View>
      <View style={styles.v3}></View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
   flex:1
  },
  v1:{
    flex:1, backgroundColor:"red"
  },  
  v2:{
    flex:1, backgroundColor:"darkorange"
  },  
  v3:{
    flex:1, backgroundColor:"green"
  },
});
