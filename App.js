import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {

  const [number, setNumber] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>결과 : {number}</Text>
      <View style={styles.buttonContainer}>
        <Button title="증가" onPress={()=>setNumber(number + 1)}/>
        <Button title="감소" onPress={()=>setNumber(number - 1)}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize:50
  },
  buttonContainer:{
    flexDirection: "row",
    gap:10
  }
});
