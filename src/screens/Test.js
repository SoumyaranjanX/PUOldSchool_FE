import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import Slider from '../components/hero/Slider';

const Test = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Sticky Header */}
      <View style={{ backgroundColor: 'blue', padding: 10, position: 'sticky', top: 0, zIndex: 2 }}>
        <Text style={{ color: 'white' }}>Sticky Header</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={{ flex: 1,  }}>
       <Slider />
       <Slider />
       <Slider />
       <Slider />
       <Slider />
       <Slider />
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={{ backgroundColor: 'green', padding: 10, position: 'sticky', bottom: 0, zIndex: 2 }}>
        <Text style={{ color: 'white' }}>Sticky Bottom Bar</Text>
      </View>
    </View>
  );
};

export default Test;
