import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { GOOGLE_API_KEY, OPEN_WEATHER_API_KEY } from '@env';
import { dummyWeatherData } from './dummyWeatherData';
import WeatherDesc from './WeatherDesc';

const SCREEN_WIDTH = Dimensions.get('window').width;

const useRegDate = () => {
  const [currentDate, setCurrentDate] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);

  useEffect(() => {
    const updateDate = () => {
      const date = new Date();

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
      const dayOfWeek = daysOfWeek[date.getDay()];

      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? '오후' : '오전';
      hours = hours % 12 || 12;

      const formattedDate = `${year}년 ${month}월 ${day}일 (${dayOfWeek}) ${ampm} ${hours}:${minutes}`;

      setCurrentDate(formattedDate);
      setCurrentDay(day);
    };

    updateDate(); // 처음 실행
    const interval = setInterval(updateDate, 60000); // 1분마다 갱신

    return () => clearInterval(interval);
  }, []);

  return { currentDate, currentDay };
};

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [permitted, setPermitted] = useState(true);
  const [cityName, setCityName] = useState('Silim');
  const [dailyWeather, setDailyWeather] = useState([]);

  const { currentDate, currentDay } = useRegDate();

  const locationData = async () => {
    console.log('위치사용 권한 요청 시도~');
    const { granted } = await Location.requestForegroundPermissionsAsync();
    console.log('granted : ', granted);

    if (!granted) {
      setPermitted(false);
      setErrorMsg('위치사용이 거부되었습니다.');
      return;
    }

    console.log('Expo.Location으로 위도 경도 얻기~');
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    console.log('latitude : ', latitude);
    console.log('longitude : ', longitude);

    const bUseGoogleGeoLocation = false;
    if (bUseGoogleGeoLocation) {
      console.log('위도, 경도르 사용해서 구글에서 주소를 얻어와요~');
      // 웹 플렛폼에서도 동작한다, 과금이 발생할 수 있다.
      console.log('GOOGLE_API_KEY : ', GOOGLE_API_KEY);
      const API_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;

      const res = await fetch(API_URL);

      const data = await res.json();
      console.log('data : ', data);
      const address = data.results[6].address_components[0].short_name;
      console.log('address : ', address[0].city);
      setCityName(address);
    } else {
      console.log('위도, 경도르 사용해서 Expo에서 주소를 얻어와요~');
      // 모바일에서만 동작한다면, 이코드를 사용하자.
      const address = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { useGoogleMaps: false }
      );
      console.log('address : ', address[0].city);

      if (address.length > 0 && address[0].city) {
        setCityName(address[0].city);
      } else {
        setCityName('Unknown');
      }
    }

    {
      let dataWeather = '';
      const bUseDummyData = true;
      if (bUseDummyData) {
        console.log('더미 데이터에서 날씨를 얻어와요~');
        dataWeather = dummyWeatherData;
      } else {
        console.log('Open Weather에서 날씨를 얻어와요~');
        console.log('OPEN_WEATHER_API_KEY : ', OPEN_WEATHER_API_KEY);
        const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&units=metric&lang=kr&appid=${OPEN_WEATHER_API_KEY}`;
        // const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude={alerts}&units=metric&lang=kr&appid=${OPEN_WEATHER_API_KEY}`;
        console.log('weatherUrl : ', weatherUrl);
        const resWeather = await fetch(weatherUrl);
        console.log('resWeather : ', resWeather);
        dataWeather = await resWeather.json();
      }

      // console.log("dataWeather : ", dataWeather);
      console.log('dataWeather.daily : ', dataWeather.daily[0].dt);

      // setDailyWeather(dataWeather.daily);
      setDailyWeather(dataWeather.daily || []); // ✅ undefined 방지
    }
  };

  useEffect(() => {
    locationData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cityContainer}>
        <Text style={styles.city}>{cityName}</Text>
      </View>
      <View style={styles.regDateCon}>
        <Text style={styles.regDate}>{currentDate}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {dailyWeather.length === 0 ? (
          <View style={styles.weatherInner}>
            <ActivityIndicator />
          </View>
        ) : (
          dailyWeather.map((day, index) => (
            <View key={index} style={styles.weatherInner}>
              <View style={styles.day}>
                <WeatherDesc day={day} />
                {/* <Text style={styles.desc}>{day.weather[0].description}</Text> */}
              </View>
              <View style={styles.tempContainer}>
                <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(0)}</Text>
                <Text style={styles.tempSymbal}>℃</Text>
              </View>
              <View style={styles.weeklyForcastContainer}>
                <View style={styles.weeklyForcastTextBox}>
                  <Text style={styles.weeklyForcastTitle}>Weekly Forcast</Text>
                  <Text style={styles.weeklyForcastDayText}>{currentDay}일</Text>
                </View>

                <View style={styles.weeklyForcastInfo}></View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe01a',
  },
  cityContainer: {
    flex: 0.3,
    // backgroundColor:"blue"
  },
  city: {
    flex: 1,
    // backgroundColor:"red",
    marginTop: 50,
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 20,
  },
  regDateCon: {
    alignItems: 'center',
  },
  regDate: {
    backgroundColor: 'black',
    color: 'white',
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    overflow: 'hidden',
    fontWeight: 'bold',
  },

  weatherInner: {
    flex: 3,
    width: SCREEN_WIDTH,
    // backgroundColor:"red"
  },
  day: {
    flex: 0.15,
    // backgroundColor:"red",
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // desc:{
  //   flex:1.5,
  //   fontSize:25,
  //   fontWeight:"bold",
  //   marginTop:20,
  // },
  tempContainer: {
    flex: 0.5,
    // backgroundColor:"blue",
    alignItems: 'center',
    justifyContent: 'center',
  },
  temp: {
    // backgroundColor:"green",
    fontSize: 120,
  },
  tempSymbal: {
    fontSize: 50,
    position: 'absolute',
    top: 70,
    right: 100,
  },
  weeklyForcastContainer: {
    // backgroundColor:"blue",
    flex: 0.6,
    alignItems: 'center',
  },
  weeklyForcastTextBox: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  weeklyForcastTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    // backgroundColor: 'green',
  },
  weeklyForcastDayText: {
    fontSize: 15,
    fontWeight: 'bold',
    // backgroundColor: 'red',
    flex: 1,
    textAlign: 'right',
    height: '100%',
    paddingTop: 10,
    paddingRight: 10,
  },
  weeklyForcastInfo: {
    backgroundColor: 'black',
    flex: 0.6,
    width: '80%',
    borderRadius: 10,
    marginTop: 10,
  },
});
