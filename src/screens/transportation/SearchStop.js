import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import Header from '../../components/header/Header';
import BottomBar from '../../components/bottombar/BottomBar';
import SearchableDropdown from 'react-native-searchable-dropdown';
import axios from 'axios';

export default function SearchStop() {
  const [stops] = useState([
    { id: 1, name: 'Library' },
    { id: 2, name: 'Ponlait' },
    { id: 3, name: 'Cauvery' },
    { id: 4, name: 'Girls Mess' },
    { id: 5, name: 'Kangai' },
    { id: 6, name: 'Ammudam Mess' },
    { id: 7, name: 'Mega Mess' },
    { id: 8, name: 'ilangon hostel' },
    { id: 9, name: 'Food science dept' },
    { id: 10, name: 'Sj' },
    { id: 11, name: 'UMISARC' },
  ]);
  const [data, setData] = useState({
    towardLibrary: [],
    towardSJ: []
  });
  const [loading, setLoading] = useState(false);
  const [selectedStartPoint, setSelectedStartPoint] = useState(false);

  const fetchData = (selectedStartPoint) => {
    setLoading(true);
    const URL = `${process.env.EXPO_PUBLIC_API_HOST}/api/bus/getbustime`;
    axios.post(URL, { stoppage: selectedStartPoint })
      .then(response => {
        console.log(response.data)
        if (response.data.statusCode == 200) {
          const sortedData = {
            towardLibrary: response.data.data.towardLibrary.sort(),
            towardSJ: response.data.data.towardSJ.sort()
          };
          setData(sortedData);
        } else {
          Alert.alert(response.data.message);
          setData({
            towardLibrary: [],
            towardSJ: []
          })
        }
        setLoading(false);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
        Alert.alert(error.message)
        setLoading(false);
      });
  };

  const handleStartPointSelect = (stop) => {
    fetchData(stop.name);
    setSelectedStartPoint(stop.name)
  };

  const getNextTimingIndex = (timings) => {
    const currentTime = new Date().getTime();
    for (let i = 0; i < timings.length; i++) {
      const [, hours, minutes, period] = timings[i].match(/(\d+):(\d+) (AM|PM)/);

      let hours24 = parseInt(hours, 10);
      if (period === 'PM' && hours24 < 12) {
        hours24 += 12;
      } else if (period === 'AM' && hours24 === 12) {
        hours24 = 0;
      }

      const busTime = new Date();
      busTime.setHours(hours24);
      busTime.setMinutes(parseInt(minutes, 10));
      busTime.setSeconds(0);

      const busTimeInMillis = busTime.getTime();

      if (busTimeInMillis > currentTime) {
        return i;
      }
    }
    return -1;
  };


  return (
    <>
      <StatusBar backgroundColor='#F08E0F' />
      <Header />
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10, marginBottom: 70, backgroundColor: '#F4F6F7', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 15, padding: 20, width: '100%' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#34495E' }}>Select 🚌 Locations</Text>
          <View style={{ marginBottom: 15, alignItems: 'center' }}>
            <SearchableDropdown
              onTextChange={(text) => console.log(text)}
              onItemSelect={handleStartPointSelect}
              containerStyle={{ width: '80%', marginTop: 5 }}
              textInputStyle={{ padding: 10, fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#34495E', borderRadius: 10, backgroundColor: '#ECF0F1' }}
              itemStyle={{ padding: 10, backgroundColor: '#ECF0F1', borderColor: '#BDC3C7', borderWidth: 1, borderRadius: 5, marginBottom: 5 }}
              itemTextStyle={{ color: '#34495E', fontSize: 16, fontWeight: 'bold' }}
              items={stops}
              defaultIndex={0}
              placeholder="Select Stopage"
              resetValue={false}
              underlineColorAndroid="transparent"
            />
          </View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20, color: '#34495E', textAlign: 'center' }}>Stopage : {selectedStartPoint}</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#3498DB" />
          ) : (
            data && data.towardSJ && data.towardLibrary ? (
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                  <View style={{ backgroundColor: '#3498DB', paddingVertical: 8, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', fontSize: 16 }}>Towards Library</Text>
                  </View>
                  {data.towardLibrary.map((item, index) => (
                    <View key={`towardLibrary-${index}`} style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#BDC3C7' }}>
                      <Text style={{ textAlign: 'center', color: getNextTimingIndex(data.towardLibrary) === index ? 'red' : '#34495E', fontSize: 15 }}>{item}</Text>
                    </View>
                  ))}
                </View>
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                  <View style={{ backgroundColor: '#F08E0F', paddingVertical: 8, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF', fontSize: 16 }}>Towards SJ</Text>
                  </View>
                  {data.towardSJ.map((item, index) => (
                    <View key={`towardSJ-${index}`} style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#BDC3C7' }}>
                      <Text style={{ textAlign: 'center', color: getNextTimingIndex(data.towardSJ) === index ? 'red' : '#34495E', fontSize: 15 }}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              <Text style={{ color: 'red', textAlign: 'center', marginTop: 10, fontSize: 16 }}>No data available</Text>
            )
          )}
        </View>
      </View>
      <BottomBar />
    </>
  );
}
