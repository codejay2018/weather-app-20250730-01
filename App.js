import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {

  const [number, setNumber] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.cityContainer}>
        <Text style={styles.city}>Silim</Text>
      </View>
      <View style={styles.weatherContainer}>
        <View style={styles.day}>
          <Text style={styles.regDate}>7월 31일 (목) 오후 5:35</Text>
          <Text style={styles.desc}>맑음</Text>
        </View>
        <View style={styles.tempContainer}>
          <Text style={styles.temp}>24</Text>
        </View>        
      </View>
           
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:"#ffe01a"
  },
  cityContainer:{
    flex:1, 
    // backgroundColor:"blue"
  },  
  city:{
    flex:1, 
    // backgroundColor:"red", 
    marginTop:50,
    fontSize:40,
    textAlign:"center",
    fontWeight:"bold",
    paddingTop:20
  },  
  weatherContainer:{
    flex:3, 
    // backgroundColor:"green"
  },  
  day:{
    flex:0.2,
    // backgroundColor:"red",
    textAlign:"center",
    fontWeight:"bold",
    fontSize:30,
    alignItems:"center",
    justifyContent:"center",
  },  
  regDate:{
    backgroundColor:"black",
    color:"white",
    paddingTop:10,
    paddingBottom:15,
    paddingLeft:20,
    paddingRight:20,
    borderRadius:20,
    overflow:"hidden",
    fontWeight:"bold",
  },

  desc:{
    flex:1.5,
    fontSize:25,
    fontWeight:"bold",
    marginTop:20,
  },
  tempContainer:{
    flex:0.5, 
    // backgroundColor:"blue",
    alignItems:"center",
    justifyContent:"center",
  },  
  temp:{
    // backgroundColor:"green",
    fontSize:120,
  },


});
