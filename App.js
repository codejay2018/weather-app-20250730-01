import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function App() {

  const [number, setNumber] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.cityContainer}>
        <Text style={styles.city}>Silim</Text>
      </View>
      <View style={styles.regDateCon}>
        <Text style={styles.regDate}>7월 31일 (목) 오후 5:35</Text>
      </View>
      <ScrollView 
        horizontal 
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather} >
        <View style={styles.weatherInner}>
          <View style={styles.day}>
            <Text style={styles.desc}>맑음</Text>
          </View>
          <View style={styles.tempContainer}>
            <Text style={styles.temp}>24</Text>
          </View>        
        </View>
        <View style={styles.weatherInner}>
          <View style={styles.day}>
            <Text style={styles.desc}>맑음</Text>
          </View>
          <View style={styles.tempContainer}>
            <Text style={styles.temp}>24</Text>
          </View>        
        </View>
        <View style={styles.weatherInner}>
          <View style={styles.day}>

            <Text style={styles.desc}>맑음</Text>
          </View>
          <View style={styles.tempContainer}>
            <Text style={styles.temp}>24</Text>
          </View>        
        </View>
        <View style={styles.weatherInner}>
          <View style={styles.day}>
            
            <Text style={styles.desc}>맑음</Text>
          </View>
          <View style={styles.tempContainer}>
            <Text style={styles.temp}>24</Text>
          </View>        
        </View>
      </ScrollView>

           
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
    flex:0.3, 
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
  regDateCon:{
    alignItems:"center",
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

  weather:{
    // paddingHorizontal:20,
    // gap:20,
    // backgroundColor:"green",
  },
  weatherInner:{
    flex:3, 
    width:SCREEN_WIDTH,
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
