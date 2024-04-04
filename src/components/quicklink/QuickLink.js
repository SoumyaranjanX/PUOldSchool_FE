import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QuickLinkCard from './QuickLinkCard';

const QuickLink = () => {
  const navigation = useNavigation()
  const quickLinks = [
    { id: 1, imageSource: require('../../../assets/quicklinks/events.png'), actionText: "Events" },
    { id: 2, imageSource: require('../../../assets/quicklinks/bus.png'), actionText: 'Transportation' },
    { id: 3, imageSource: require('../../../assets/quicklinks/map.png'), actionText: 'Uni-Map' },
    { id: 4, imageSource: require('../../../assets/quicklinks/complaints.png'), actionText: 'Complaints' },
  ];

  const handleClick = (action) => {
    if(action === 'Transportation'){
      navigation.navigate('SearchStop')
    }
    else if(action  === 'Uni-Map'){
      navigation.navigate("Map")
    }
    else if(action === 'Complaints'){
      navigation.navigate('SelectComplaint')
    }
    else if(action === 'Events'){
      navigation.navigate('AllEvents')
    }
  }

  return (
    <View style={styles.quickLinkContainer}>
      {quickLinks.map((link) => (
        <QuickLinkCard
          key={link.id}
          imageSource={link.imageSource}
          actionText={link.actionText}
          onPress={() => handleClick(link.actionText)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  quickLinkContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  }
});

export default QuickLink;
