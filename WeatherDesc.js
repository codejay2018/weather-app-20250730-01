import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
// utils/desc.js
export const desc = [
  { id: 200, text: "가벼운 비를 동반한 천둥구름", icon: "lightning" },
  { id: 201, text: "비를 동반한 천둥구름", icon: "lightning" },
  { id: 202, text: "폭우를 동반한 천둥구름", icon: "lightning" },
  { id: 210, text: "약한 천둥구름", icon: "lightning" },
  { id: 211, text: "천둥구름", icon: "lightning" },
  { id: 212, text: "강한 천둥구름", icon: "lightning" },
  { id: 221, text: "불규칙적 천둥구름", icon: "lightning" },
  { id: 230, text: "약한 연무를 동반한 천둥구름", icon: "lightning" },
  { id: 231, text: "연무를 동반한 천둥구름", icon: "lightning" },
  { id: 232, text: "강한 안개비를 동반한 천둥구름", icon: "lightning" },

  { id: 300, text: "가벼운 안개비", icon: "rain" },
  { id: 301, text: "안개비", icon: "rain" },
  { id: 302, text: "강한 안개비", icon: "rain" },
  { id: 310, text: "가벼운 적은비", icon: "rain" },
  { id: 311, text: "적은비", icon: "rain" },
  { id: 312, text: "강한 적은비", icon: "rain" },
  { id: 313, text: "소나기와 안개비", icon: "rain" },
  { id: 314, text: "강한 소나기와 안개비", icon: "rain" },
  { id: 321, text: "소나기", icon: "rain" },

  { id: 500, text: "약한 비", icon: "rain" },
  { id: 501, text: "중간 비", icon: "rain" },
  { id: 502, text: "강한 비", icon: "rain" },
  { id: 503, text: "매우 강한 비", icon: "rain" },
  { id: 504, text: "극심한 비", icon: "rain" },
  { id: 511, text: "우박", icon: "snowflake" },
  { id: 520, text: "약한 소나기 비", icon: "rain" },
  { id: 521, text: "소나기 비", icon: "rain" },
  { id: 522, text: "강한 소나기 비", icon: "rain" },
  { id: 531, text: "불규칙적 소나기 비", icon: "rain" },

  { id: 600, text: "가벼운 눈", icon: "snow" },
  { id: 601, text: "눈", icon: "snow" },
  { id: 602, text: "강한 눈", icon: "snow" },
  { id: 611, text: "진눈깨비", icon: "snow" },
  { id: 612, text: "소나기 진눈깨비", icon: "snow" },
  { id: 615, text: "약한 비와 눈", icon: "snow" },
  { id: 616, text: "비와 눈", icon: "snow" },
  { id: 620, text: "약한 소나기 눈", icon: "snow" },
  { id: 621, text: "소나기 눈", icon: "snow" },
  { id: 622, text: "강한 소나기 눈", icon: "snow" },

  { id: 701, text: "박무", icon: "fog" },
  { id: 711, text: "연기", icon: "fog" },
  { id: 721, text: "연무", icon: "fog" },
  { id: 731, text: "모래 먼지", icon: "fog" },
  { id: 741, text: "안개", icon: "fog" },
  { id: 751, text: "모래", icon: "fog" },
  { id: 761, text: "먼지", icon: "fog" },
  { id: 762, text: "화산재", icon: "fog" },
  { id: 771, text: "돌풍", icon: "wind" },
  { id: 781, text: "토네이도", icon: "wind" },

  { id: 800, text: "구름 한 점 없는 맑은 하늘", icon: "day-sunny" },
  { id: 801, text: "약간의 구름이 낀 하늘", icon: "day-cloudy" },
  { id: 802, text: "드문드문 구름이 낀 하늘", icon: "day-cloudy" },
  { id: 803, text: "구름이 거의 없는 하늘", icon: "cloudy" },
  { id: 804, text: "구름으로 뒤덮인 흐린 하늘", icon: "cloudy" },

  { id: 900, text: "토네이도", icon: "wind" },
  { id: 901, text: "태풍", icon: "wind" },
  { id: 902, text: "허리케인", icon: "wind" },
  { id: 903, text: "한랭", icon: "snowflake" },
  { id: 904, text: "고온", icon: "day-sunny" },
  { id: 905, text: "바람부는", icon: "wind" },
  { id: 906, text: "우박", icon: "snowflake" },

  { id: 951, text: "바람이 거의 없는", icon: "wind" },
  { id: 952, text: "약한 바람", icon: "wind" },
  { id: 953, text: "부드러운 바람", icon: "wind" },
  { id: 954, text: "중간 세기 바람", icon: "wind" },
  { id: 955, text: "신선한 바람", icon: "wind" },
  { id: 956, text: "센 바람", icon: "wind" },
  { id: 957, text: "돌풍에 가까운 센 바람", icon: "wind" },
  { id: 958, text: "돌풍", icon: "wind" },
  { id: 959, text: "심각한 돌풍", icon: "wind" },
  { id: 960, text: "폭풍", icon: "wind" },
  { id: 961, text: "강한 폭풍", icon: "wind" },
  { id: 962, text: "허리케인", icon: "wind" }
];

const WeatherDesc = ({ day }) => {
  const id = day?.weather?.[0]?.id;
  const result = desc.find((item) => item.id === id);

    return (
        <View style={styles.container}>
            {result && <Fontisto name={result.icon} size={30} color="black" />}
            <Text style={styles.desc}>{result ? result.text : "Not Found."}</Text>
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