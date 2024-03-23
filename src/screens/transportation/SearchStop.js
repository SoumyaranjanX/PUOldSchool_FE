import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../components/header/Header';
import BottomBar from '../../components/bottombar/BottomBar';
import SearchableDropdown from 'react-native-searchable-dropdown';

export default function SearchStop() {
  const [selectedStop, setSelectedStop] = useState('');
  const [stops] = useState([
    { id: 1, name: 'Library' },
    { id: 2, name: 'Stop 2' },
    { id: 3, name: 'Stop 3' }
  ]);

  const handleShowAllTimings = () => {
    // Implement logic to show all timings for the selected stop
    // For example, you can reset the selected stop
    setSelectedStop('');
  };

  return (
    <>
      <StatusBar backgroundColor={'#F08E0F'} />
      <Header />
      <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
            <SearchableDropdown
              onTextChange={(text) => console.log(text)}
              onItemSelect={(stop) => setSelectedStop(stop.name)}
              containerStyle={{ padding: 5 }}
              textInputStyle={{
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
              }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={stops}
              defaultIndex={0}
              placeholder="Select stop"
              resetValue={false}
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#F08E0F',
                paddingVertical: 10,
                borderRadius: 5,
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={handleShowAllTimings}>
              <Text style={{ color: '#FFF' }}>Show All Timings</Text>
            </TouchableOpacity>
          </View>
      </View>
      <BottomBar />
    </>
  );
}
