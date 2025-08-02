import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { 
  ActivityIndicator, 
  Dimensions, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View } from 'react-native';
import * as Location from 'expo-location';
import { GOOGLE_API_KEY, OPEN_WEATHER_API_KEY } from '@env';
import { dummyWeatherData } from "./dummyWeatherData"
import WeatherDesc from './WeatherDesc';

const SCREEN_WIDTH = Dimensions.get("window").width;


export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [permitted, setPermitted] = useState(true);
  const [cityName, setCityName] = useState("Silim");
  const [dailyWeather, setDailyWeather] = useState([]);


  const locationData = async () => {

    console.log("위치사용 권한 요청 시도~");
    const {granted} = await Location.requestForegroundPermissionsAsync();
    console.log("granted : ", granted);
    
    if(!granted){
      setPermitted(false);
      setErrorMsg("위치사용이 거부되었습니다.");
      return;
    }

    console.log("Expo.Location으로 위도 경도 얻기~")
    const {coords:{latitude, longitude},} = await Location.getCurrentPositionAsync({accuracy:5});
    console.log("latitude : ", latitude);
    console.log("longitude : ", longitude);

    const bUseGoogleGeoLocation = false;
    if(bUseGoogleGeoLocation){
      console.log("위도, 경도르 사용해서 구글에서 주소를 얻어와요~");
      // 웹 플렛폼에서도 동작한다, 과금이 발생할 수 있다.
      console.log("GOOGLE_API_KEY : ", GOOGLE_API_KEY);
      const API_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;

      const res = await fetch(API_URL);

      const data = await res.json();
      console.log("data : ", data);
      const address = data.results[6].address_components[0].short_name;
      console.log("address : ", address[0].city);
      setCityName(address);

    }else{
      console.log("위도, 경도르 사용해서 Expo에서 주소를 얻어와요~")
      // 모바일에서만 동작한다면, 이코드를 사용하자.
      const address = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
      console.log("address : ", address[0].city);

      if (address.length > 0 && address[0].city) {
        setCityName(address[0].city);
      } else {
        setCityName("Unknown");
      }

    }
  
    
    {
      let dataWeather = "";
      const bUseDummyData = true;
      if(bUseDummyData){
        console.log("더미 데이터에서 날씨를 얻어와요~")
        dataWeather = dummyWeatherData;
      }else{
        console.log("Open Weather에서 날씨를 얻어와요~")
        console.log("OPEN_WEATHER_API_KEY : ", OPEN_WEATHER_API_KEY);
        const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&units=metric&lang=kr&appid=${OPEN_WEATHER_API_KEY}`;
        // const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={alerts}&units=metric&lang=kr&appid=${OPEN_WEATHER_API_KEY}`;
        console.log("weatherUrl : ", weatherUrl);
        const resWeather = await fetch(weatherUrl);
        console.log("resWeather : ", resWeather);
        dataWeather = await resWeather.json();
      }

      console.log("dataWeather : ", dataWeather);
      console.log("dataWeather.daily : ", dataWeather.daily[0].dt);
    
      // setDailyWeather(dataWeather.daily);
      setDailyWeather(dataWeather.daily || []); // ✅ undefined 방지
    }

    


  }

  useEffect(()=>{
    
    locationData();


  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cityContainer}>
        <Text style={styles.city}>{cityName}</Text>
      </View>
      <View style={styles.regDateCon}>
        <Text style={styles.regDate}>7월 31일 (목) 오후 5:35</Text>
      </View>
      <ScrollView 
        horizontal 
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather} >
        {
          dailyWeather.length === 0 ? (
            <View style={styles.weatherInner}>
              <ActivityIndicator/>
            </View>
          ) : (
            dailyWeather.map((day, index)=>(
              <View key={index} style={styles.weatherInner}>
                <View style={styles.day}>
                  <WeatherDesc day={day}/>
                  {/* <Text style={styles.desc}>{day.weather[0].description}</Text> */}
                </View>
                <View style={styles.tempContainer}>
                  <Text style={styles.temp}>{
                  parseFloat(day.temp.day).toFixed(0)
                  }</Text>
                  <Text style={styles.tempSymbal}>℃</Text>
                </View>        
              </View>
            ))
          )
        }
        
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
    flex:0.15,
    // backgroundColor:"red",
    textAlign:"center",
    fontWeight:"bold",
    fontSize:30,
    alignItems:"center",
    justifyContent:"center",
  },  

  // desc:{
  //   flex:1.5,
  //   fontSize:25,
  //   fontWeight:"bold",
  //   marginTop:20,
  // },
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
  tempSymbal:{
    fontSize:50,
    position:"absolute",
    top:70,
    right:100,
  }


});
